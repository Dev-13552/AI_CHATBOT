import { useState } from "react";
import axios from "axios";
import crypto from "crypto";
function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function handleChange(e) {
    setText(e.target.value);
  }
  async function handleClick(e) {
    setError("");
    setLoading(true);
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        id: "loading",
        role: "assistant",
        content: "Thinking...",
      },
    ]);
    setText("");
    try {
      const response = await axios.post("http://localhost:3000/api/chat", {
        text,
        messages,
      });
      const aiMessage = {
        id: Date.now(),
        role: "assistant",
        content: response.data.aiResponse,
      };
      setMessages((prev) =>
        prev.map((msg) => (msg.id === "loading" ? aiMessage : msg)),
      );
    } catch (error) {
      console.log(error);
      setError(
      error.response?.data?.message ||
      error.message ||
      "Something went wrong"
    );
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return (
      <div
        className="
        bg-red-500/10
        border
        border-red-500/30
        text-red-400
        px-4
        py-3
        rounded-xl
        mb-4
      "
      >
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 py-4">
        <h1 className="text-center text-2xl font-bold">AI Chatbot</h1>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 gap-2">
        {/* Messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.role === "user"
                ? "flex justify-end"
                : "flex justify-start"
            }
          >
            <div
              className={
                message.role === "user"
                  ? "bg-purple-600 p-3 rounded-xl"
                  : "bg-gray-800 p-3 rounded-xl"
              }
            >
              {message.content}
            </div>
          </div>
        ))}
      </main>

      {/* Input Area */}
      <footer className="border-t border-gray-800">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Ask anything..."
              className="
          flex-1
          bg-gray-900
          border
          border-gray-700
          text-white
          px-4
          py-3
          rounded-xl
          outline-none
          focus:border-purple-500
        "
              value={text}
              onChange={handleChange}
            />

            <button
              className="
          bg-purple-600
          hover:bg-purple-700
          px-6
          py-3
          rounded-xl
          font-medium
          transition
        "
              onClick={handleClick}
            >
              Send
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
