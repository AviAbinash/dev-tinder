"use client";

import React, { useState, useEffect } from "react";
import { createSocketConnection } from "../utils/socketConnection";
// import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/hooks/reduxHook";

const ChatPage = () => {
  const params = useParams();
  const targetId = params.id;
  const [messages, setMessages] = useState([
  ]);

  const [inputvalue, setInputValue] = useState("");

  const { loginData } = useAppSelector((state) => state.auth);
  const userId = loginData?.id;

  useEffect(() => {
    const socket = createSocketConnection();
    if (userId && targetId) {
      socket.emit("joinchat", { userId, targetId });
    }

    socket.on("newMessage", ({text}) => {
      console.log("text", text);
      setMessages((prev)=>[...prev,{name:"Abinash",text}])
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetId]);

  const sendMessage = () => {
    if (!userId && !targetId) {
      return;
    }
    const socket = createSocketConnection();

    socket.emit("sendMessage", { userId, targetId, text: inputvalue });
    setInputValue("")
  };

  return (
    <div className="h-100 flex bg-gray-700">
      {/* Sidebar */}
      {/* <div className="w-64  p-4 border-r">
        <h2 className="text-lg font-semibold mb-4 text-black">Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user}
              className="p-2 rounded hover:bg-gray-500 cursor-pointer text-black"
            >
              {user}
            </li>
          ))}
        </ul>
      </div> */}

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className=" px-4 py-2 font-semibold text-black">
          Chat with John
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 text-black">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded max-w-xs ${
                msg.sender === "Me"
                  ? "bg-blue-100 self-end"
                  : "bg-gray-200 self-start"
              }`}
            >
              <span className="text-sm">{msg.text}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-gray-800 border-t flex gap-2">
          <input
            className="flex-1 border p-2 rounded"
            type="text"
            placeholder="Type your message..."
            value={inputvalue}
            onChange={(e) => setInputValue(e.target.value)}
            // onKeyDown={(e) => e.key === "Enter"
            //    && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-black px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
