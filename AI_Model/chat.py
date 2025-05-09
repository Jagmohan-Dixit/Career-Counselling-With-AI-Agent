# Client Using Pre-Defined MCP Server present in mcp.json(Playwright, AirBnb, DuckDuckGo)

import os
import asyncio
from dotenv import load_dotenv
from mcp_use import MCPAgent, MCPClient
from langchain_groq import ChatGroq
from rich.console import Console
from rich.panel import Panel
from rich.markdown import Markdown

load_dotenv()

console = Console()

from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from langchain.llms import HuggingFacePipeline
import torch

def get_model():
    model_path = "/home/jagmohan/AI_ML/Models/meta-llama/Llama-3.2-3B-Instruct"

    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForCausalLM.from_pretrained(
        model_path,
        device_map="auto",
        torch_dtype=torch.float16
    )

    pipe = pipeline("text-generation", model=model, tokenizer=tokenizer, max_new_tokens=512)
    llm = HuggingFacePipeline(pipeline=pipe)
    
    return llm


async def run_memory_chat():
    
    os.environ["GROQ_API_KEY"] = "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"
    # config_file = "/home/jagmohan/AI_ML/AI_Projects/mcp_chat/backend/mcp_severs.json"

    client = MCPClient.from_config_file(r"D:\Codebase\Projects\Career-Counselling-main\AI_Model\mcp_server.json")
   
    llm = ChatGroq(model="qwen-qwq-32b")
    
    agent = MCPAgent(
        llm=llm,
        client=client,
        max_steps=15,
        verbose=True,
    )
    
    print("Chat with the MCP Agent Starting")
    print("Type 'exit' to quit")
    print("---------------------------------------------\n")
    
    
    try:
        while True:
            user_input = input("You: ")
            if user_input.lower() in ["exit", "quit"]:
                print("Ending the conversation...")
                break
            
            if user_input.lower() in ["clear", "reset"]:
                agent.clear_conversation_history()
                print("Conversation history cleared")
                continue
            
            try:
                response = await agent.run(user_input)
                print(f"Loaded response : {response }")
                formatted_response = Markdown(response)
                console.print("\n")
                console.print(Panel(
                    formatted_response,
                    title="🤖 Agent Response",
                    border_style="blue",
                    padding=(1, 2)
                ))
            except Exception as e:
                print(f"\nError: {e}")
            
    except KeyboardInterrupt:
        print("Exiting the chat...")
    
    finally:
        if client and client.sessions:
            await client.close_all_sessions()

if __name__ == "__main__":
    asyncio.run(run_memory_chat())


