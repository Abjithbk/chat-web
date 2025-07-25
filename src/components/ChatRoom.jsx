import React from "react";

const ChatRoom = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xl font-bold py-4 px-6">
          Chat Room
        </div>

        {/* Messages */}
        <div className="flex-1 px-6 py-4 overflow-y-auto h-[400px] space-y-2">
          {/* Sender Message */}
          <div className="flex justify-start">
            <div className="bg-gray-400 text-white rounded-xl px-4 py-2 max-w-[75%]">
              <div className="text-sm font-semibold">Alice</div>
              <div>Hello, how are you?</div>
            </div>
          </div>

          {/* Receiver Message */}
          <div className="flex justify-end">
            <div className="bg-blue-600 text-white rounded-xl px-4 py-2 max-w-[75%]">
              <div className="text-sm font-semibold">You</div>
              <div>I'm good! How about you?</div>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="flex border-t px-4 py-3 bg-gray-50">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button className="ml-3 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
