import os
import json
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from langchain_groq import ChatGroq
import asyncio
from contextlib import asynccontextmanager
from mcp_use import MCPAgent, MCPClient
from langchain.chat_models import init_chat_model
# from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace


load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # It will Execute on Startup(Only code before yield)
    os.environ["GROQ_API_KEY"] = "your key"
    global agent
    config_file = r"Path to mcp.json"
    client = MCPClient.from_config_file(config_file)
    print(client)
    llm = ChatGroq(model="qwen-qwq-32b")
    
    # if not os.environ.get("NVIDIA_API_KEY"):
    #     os.environ["NVIDIA_API_KEY"] = "your key"
    # llm = init_chat_model("meta/llama3-70b-instruct", model_provider="nvidia")  
        
    agent = MCPAgent(
        llm=llm,
        client=client,
        max_steps=15,
        verbose=True,
    )
    print("Agent : ", agent)
    
    yield
    
    # It will Execute on Shutdown(After yield)
    if client and client.sessions:
        await client.close_all_sessions()

app = FastAPI(lifespan=lifespan)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ask")
async def ask_agent(request: Request):
    try:
        body = await request.json()
        print(f"Received request with data : {body}")
        query = body.get("message", "")
        response = await agent.run(query)
        print(":: response :: ", response)
        
        # response = response.split("Final Answer")
        # response = response[1] if len(response) > 1 else response[0]
        # if(response[0] == ':'):
        #     response = response[1:]
        
        return {"response": response}
    except Exception as e:
        print("Error : ", str(e))
        return {"error": str(e)}
    

@app.get("/ask")
async def ask_agent(request: Request):
    try:
        # body = await request.json()
        # print(f"Received request with data : {body}")
        # query = body.get("message", "")
        query = "Hiii"
        response = await agent.run(query)
        print(":: response :: ", response)
        
        # response = response.split("Final Answer")
        # response = response[1] if len(response) > 1 else response[0]
        # if(response[0] == ':'):
        #     response = response[1:]
        
        return {"response": response}
    except Exception as e:
        print("Error : ", str(e))
        return {"error": str(e)}


@app.post("/clear")
async def clear_agent(request: Request):
    try:
        print("Inside clear_agent")
        # body = await request.json()
        # print(f"Received request with data : {body}")
        response = agent.clear_conversation_history()
        print(":: response :: ", response)
        return {"response": "Cleared Succesfully"}
    except Exception as e:
        print("error : ", str(e))
        return {"error": str(e)}




@app.get("/")
def home(req : Request):
    return {"Message" : "Server is UP"}