import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { makeRequest } from "../../../axios";

// Socket connection
const socket = io("wss://api.studypulse.live", {
  path: "/socket.io",
  forceNew: true,
  reconnectionAttempts: 3,
  timeout: 2000,
});

const GroupChatWindow = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [discussionId, setDiscussionId] = useState("");
  const location = useLocation();
  const { curr } = location.state || {};

  // ✅ Set discussionId when component mounts
  useEffect(() => {
    if (curr?.discussionId) {
      setDiscussionId(curr.discussionId);
    }
  }, [curr]);

  // ✅ Join discussion when discussionId is set
  useEffect(() => {
    if (discussionId) {
      socket.emit("join-discussion", { discussionId });
      console.log(`Joined discussion: ${discussionId}`);
    }

    // Cleanup function to leave the discussion when component unmounts
    return () => {
      socket.emit("leave-discussion", { discussionId });
      console.log(`Left discussion: ${discussionId}`);
    };
  }, [discussionId]);

  // ✅ Listen for new messages (runs only once)
  useEffect(() => {
    socket.on("get-message", (message) => {
      console.log("Received message:", message);
      setMessages((prev) => [...prev, message]);
    });

    // Cleanup function to prevent multiple listeners
    return () => {
      socket.off("get-message");
    };
  }, []);

  // ✅ Fetch existing discussion messages
  const fetchDiscussion = useCallback(async () => {
    try {
      const res = await makeRequest.get(
        `get-discussions?discussionId=${curr.discussionId}&limit=10&page=1`
      );
      console.log("Discussion messages:", res?.data.data);
      setMessages(res?.data.data || []);
    } catch (error) {
      console.error("Error fetching discussion:", error);
    }
  }, [curr.discussionId]);

  // Only call fetchDiscussion once on mount
  useEffect(() => {
    fetchDiscussion();
  }, [fetchDiscussion]);

  // ✅ Handle Send Message
  const handleSendMessage = async () => {
    try {
      await makeRequest.post("send-message-in-discussion", {
        discussionId: curr.discussionId,
        content: message,
        chapterCurriculumId: curr._id,
        messageType: "text",
      });

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-3xl w-full max-w-xl p-6 flex flex-col">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Chat Room
        </h2>

        {/* Messages Section */}
        <div className="flex-1 bg-gray-100 p-4 rounded-xl overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.user === "You" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg text-sm ${msg.user === "You" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800"}`}
              >
                <div>{msg.content}</div>
                <div className="text-xs text-right text-gray-500 mt-1">
                  <span>{new Date(msg.timestamp).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Section */}
        <div className="flex items-center mt-4 space-x-2">
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-send"
              viewBox="0 0 16 16"
            >
              <path d="M15.75 7.75a.75.75 0 0 0-.75-.75h-10.74l8.45-6.717a.75.75 0 0 0-.97-1.125l-10 7.5a.75.75 0 0 0 0 1.25l10 7.5a.75.75 0 0 0 .97-1.125l-8.45-6.717h10.74a.75.75 0 0 0 .75-.75z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChatWindow;

/*
Connect to server	const socket = io("http://localhost:4000")
Send event	socket.emit("eventName", data)
Receive event	socket.on("eventName", callback)
Handle connection	socket.on("connect", callback)
Handle disconnection	socket.on("disconnect", callback)
Manually disconnect	socket.disconnect()
*/
