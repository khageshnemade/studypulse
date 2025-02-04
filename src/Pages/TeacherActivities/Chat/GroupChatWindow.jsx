import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { makeRequest } from "../../../axios";

// const socket = io("http://localhost:4000",{
const socket = io("wss://api.studypulse.live", {
  path: "/socket.io",
  forceNew: true,
  reconnectionAttempts: 3,
  timeout: 2000,
});

const GroupChatWindow = () => {
  const [userName, setUserName] = useState(""); // Store username in state
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [discussionId, setDiscussionId] = useState("");
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const [likeCount, setLikeCount] = useState(0);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [joinedDiscussion, setJoinedDiscussion] = useState(false);
  const { curr } = location.state || {};
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  
  const handleJoinDiscussion = () => {
    if (socket && discussionId) {
      socket.emit("join-discussion", { discussionId });
      setJoinedDiscussion(true);
      setIsLoggedIn(true);
      console.log(`Joined discussion: ${discussionId}`);
    }
  };

  const handleSendMessage = () => {
    if (socket && message) {
      socket.emit("send-message", { discussionId, message });
      setMessage(""); 
    }
  };

  const handleLikeDiscussion = () => {
    if (socket) {
      socket.emit("like-discussion", { discussionId });
    }
  };


  useEffect(() => {
    setDiscussionId(curr.discussionId||"6799fff4db0e4a39f88c19d3");
      socket.on("connect", () => {
      console.log("Connected to the server!");
    });
    console.log("Go to Get_message");
    socket.on("get-message", (message) => {
      console.log("Received message", message);
      setReceivedMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("get-like-count", (count) => {
      console.log("Received like count", count);
      setLikeCount(count);
    });
    socket.on("connect_error", (error) => {
      console.error("Connection Error: ", error);
    });
    // socket.on("disconnect", (reason) => {
    //   console.log("Disconnected from server. Reason:", reason);
    // });
    socket.on("error", (err) => {
      console.error("Error:", err);
    });
    socket.on("reconnect", (attempt) => {
      console.log(`Reconnected to server after ${attempt} attempts`);
    });
    socket.on("connect_timeout", () => {
      console.error(
        "Connection timeout. Please check your network or the server status."
      );
    });

    return () => socket.disconnect();
  }, []);
  useEffect(() => {
    fetchDiscussion()
  }, [discussionId])
  


  const sendMessage = () => {
    if (message.trim()) {
      const msgData = { user: userName, text: message };
      socket.emit("join-discussion", msgData);
      setMessage("");
    }
  };
  const fetchDiscussion = async() => {
   const res=await makeRequest.get(`get-discussions?discussionId=${curr.discussionId}&limit=200&page=1`);
console.log("discussion",res?.data.data);
setMessages(res?.data.data);
  };
const joinDiscussion = ()=>{
  const discussionRoom = `discussion-${discussionId}`;
  socket.emit("join-discussion", { discussionId });
  socket.emit("join", discussionRoom); // Explicit join could be omitted if handled in the server-side code.
  console.log(`Joining discussion room: ${discussionRoom}`);
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        {!isLoggedIn ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Enter your Username</h2>
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded-lg focus:ring focus:ring-blue-400"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button
              onClick={handleJoinDiscussion}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Join Chat
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-4">Chat Room</h2>

            <div className="bg-gray-200 p-4 rounded-lg h-64 overflow-y-auto mb-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-2 rounded-lg ${msg.user === userName ? 'bg-blue-500 text-white text-right' : 'bg-gray-300 text-left'}`}
                >
                 
                  <div>{msg.content}</div>
                  <div className="text-xs flex justify-end">{msg.senderDetails[0].firstName+msg.senderDetails[0].lastName} <span >{new Date(msg.timestamp).toLocaleString()}</span></div>
                </div>
              ))}
            </div>

            <div className="flex">
              <input
                type="text"
                className="flex-grow p-2 border rounded-lg focus:ring focus:ring-blue-400"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>

            <h3 className="mt-6 text-center text-gray-700">Online Users</h3>
            <ul className="text-center">
              {users.map((user, index) => (
                <li key={index} className="text-blue-500">{user}</li>
              ))}
            </ul>
          </div>
        )}
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

