'use client';

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Send, Bot, User, Loader, Trash2 } from "lucide-react"; // Add Trash2 import
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function CollegePredictor() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const MODEL_URL = process.env.MODEL_URL

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clearMessages = async (e) => {
    e.preventDefault();
    console.log("inside clear message")
    const res = await axios.post("http://localhost:8001/clear");
    console.log("Clear Response : ", res);
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      const loadedMessages = JSON.parse(storedMessages);
      setMessages(loadedMessages);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages]);

  // Focus on input after response
  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  // Simulated thinking state before showing response
  const simulateThinking = () => {
    setThinking(true);
    return new Promise(resolve => setTimeout(resolve, 800));
  };

  const handleQuery = async (e) => {
    e.preventDefault();
    console.log("handleQuery")
    const trimmedInput = input.trim();
    console.log(trimmedInput)
    if (!trimmedInput) return;

    const userMessage = { 
      sender: "user", 
      text: trimmedInput,
      timestamp: new Date().toISOString() 
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      await simulateThinking();
      setThinking(false);

      const res = await axios.post("http://localhost:8001/ask", { message: trimmedInput });
      console.log("Ask Response : ", res);
      const agentReply = res.data.response || res.data.error;
      const aiMessage = { 
        sender: "ai", 
        text: agentReply,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { 
        sender: "ai", 
        text: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
        isError: true,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    // Submit on Enter (without Shift for newline)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleQuery(e);
    }
  };

  // Format date for message timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative min-h-screen bg-gray-700 flex flex-col mt-6">
      {/* Header */}
      <div className="fixed w-full h-16 z-10">
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bot className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Agent Chat
              </h1>
            </div>
            {/* <div className="text-md text-gray-500">Your Assistant</div> */}
            {/* Clear Messages Button */}
            <button
              onClick={clearMessages}
              className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center space-x-1"
            >
              <span>Clear Chat</span>
              <Trash2 size={16} />
            </button>
          </div>
        </header>
      </div>

      {/* Main chat container */}
      <div className="relative mt-16 overflow-hidden flex flex-col max-w-5xl w-full mx-auto">
        {/* Welcome message if no messages */}
        {messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center max-w-lg p-8 rounded-xl bg-white shadow-sm border border-gray-100">
              <Bot className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h2 className="text-xl font-semibold mb-3">Welcome to MCP Agent</h2>
              <p className="text-gray-600 mb-6">
                I'm here to assist you with information and answer your questions. 
                How can I help you today?
              </p>
              <div className="p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
                <p className="font-medium mb-2">Try asking:</p>
                <ul className="space-y-1 text-blue-700">
                  <li>"What's the latest research on quantum computing?"</li>
                  <li>"Can you explain how machine learning works?"</li>
                  <li>"Write a summary about climate change"</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Message area */}
        {messages.length > 0 && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : ""} gap-2`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center 
                    ${msg.sender === "user" ? "bg-blue-100" : "bg-purple-100"}`}>
                    {msg.sender === "user" ? 
                      <User className="h-5 w-5 text-blue-600" /> : 
                      <Bot className="h-5 w-5 text-purple-600" />
                    }
                  </div>

                  {/* Message content */}
                  <div className={`py-3 px-4 rounded-xl ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-white text-gray-800 shadow-sm border border-gray-100"}`}>
                    <div className={`prose max-w-none ${msg.sender === "user" ? "text-white" : ""}`}>
                      {msg.sender === "ai" ? (
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeHighlight]}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      ) : (
                        msg.text
                      )}
                    </div>
                    <div className={`text-xs mt-1 text-right ${msg.sender === "user" ? "text-blue-200" : "text-gray-400"}`}>
                      {formatTimestamp(msg.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input area */}
        <div className="px-4 max-w-4xl">
          <form onSubmit={handleQuery} className="relative mx-auto fixed bottom-0 w-full shadow-md z-20">
            <div className="relative shadow-sm rounded-lg">
              <textarea
                ref={inputRef}
                placeholder="Ask Anything..."
                className="w-full p-4 pr-16 text-white rounded-lg bg-gray-600 border border-gray-200 resize-none overflow-hidden"
                style={{ minHeight: "60px", maxHeight: "200px" }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`absolute right-3 bottom-3 p-2 rounded-md ${loading || !input.trim() ? "bg-white" : "bg-primary"} transition-colors`}
              >
                {loading ? (
                  <Loader className="text-black h-5 w-5 animate-spin" />
                ) : (
                  <Send className={`h-6 w-8 ${loading || !input.trim() ? "text-black" : "text-white"}`} />
                )}
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send, Shift+Enter for a new line
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

CollegePredictor.showFooter = false;

export default CollegePredictor;
