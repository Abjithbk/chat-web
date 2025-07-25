import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';

const JoinChatRoom = () => {
   const[roomName,setRoomName] = useState("");

   const navigate = useNavigate();
    const handleJoinRoom = () => {
        if(roomName.trim()!== "") {
            navigate(`/chat/${roomName}`);
        }
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Join a Chat Room
        </h2>
        <input
          type="text"
           value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
        onClick={() => {
            handleJoinRoom();
        }}
          className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Join Room
        </button>
      </div>
    </div>
  )
}

export default JoinChatRoom
