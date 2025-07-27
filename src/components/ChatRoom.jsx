import React, { useState, useEffect, useRef } from "react";

const ChatRoom = () => {
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!isJoined) return;

    const ws = new WebSocket("wss://chatroom-rwgp.onrender.com/ws/chat/general/");
    setSocket(ws);

    ws.onopen = () => console.log("WebSocket Connected");
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data]);
    };
    ws.onerror = (e) => console.error("WebSocket Error", e);
    ws.onclose = () => console.log("WebSocket Disconnected");

    return () => ws.close();
  }, [isJoined]);

  const sendMessage = () => {
    if (socket && message.trim()) {
      const msgData = { user: username, message };
      socket.send(JSON.stringify(msgData));
      setMessage("");
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isJoined) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-background">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 text-purple-600">Enter Username</h1>
          <input
            type="text"
            placeholder="e.g., Nithin"
            className="w-full border px-4 py-2 rounded-md mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={() => username.trim() && setIsJoined(true)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md"
          >
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 animate-background transition-all">
      <div className="w-full max-w-xl rounded-2xl overflow-hidden shadow-xl bg-white">
        <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-lg">
          Chat Room – {username}
          <button
            onClick={() => {
              setIsJoined(false);
              setUsername("");
              setMessages([]);
              if (socket) socket.close();
            }}
            className="bg-white text-purple-600 px-4 py-1 rounded-full text-sm"
          >
            Change User
          </button>
        </div>

        <div className="h-[400px] overflow-y-auto bg-gray-50 px-4 py-2 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.user === username ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-xl px-4 py-2 text-white text-sm max-w-[70%] ${
                  msg.user === username ? "bg-blue-600" : "bg-gray-500"
                }`}
              >
                {msg.user !== username && (
                  <div className="font-bold text-xs mb-1">{msg.user}</div>
                )}
                <div>{msg.message}</div>
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        <div className="flex px-4 py-3 bg-white border-t items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-3 px-4 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
