import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { makeRequest } from "../../../axios";
import { ArrowLeft, Send } from "lucide-react";

let socket;

const GroupChatWindow = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [discussionId, setDiscussionId] = useState("");
  const location = useLocation();
  const { curr, chapter } = location.state || {};
  const [page, setPage] = useState(1);
  const chatContainerRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (curr?.discussionId) {
      setDiscussionId(curr.discussionId);
    }
  }, [curr]);

  useEffect(() => {
    if (discussionId) {
      socket = io("wss://api.studypulse.live", {
        path: "/socket.io",
        forceNew: true,
        reconnectionAttempts: 3,
        timeout: 2000,
      });

      socket.emit("join-discussion", { discussionId });
      console.log(`Joined discussion: ${discussionId}`);

      socket.on("get-message", (message) => {
        console.log("Received message:", message);
        setMessages((prev) => [
          ...prev,
          {
            ...message,
            senderDetails: [message.senderDetails],
            timestamp: new Date().toISOString(),
          },
        ]);
      });

      return () => {
        socket.off("get-message");
        socket.disconnect();
      };
    }
  }, [discussionId]);

  const fetchDiscussion = useCallback(async () => {
    if (!curr?.discussionId || !hasMore) return;

    try {
      const res = await makeRequest.get(
        `get-discussions?discussionId=${curr.discussionId}&limit=10&page=${page}`
      );
      const newMessages = res?.data.data || [];

      if (newMessages.length === 0) {
        setHasMore(false); // No more messages
      }

      setMessages((prev) => [...newMessages.reverse(), ...prev]);
    } catch (error) {
      console.error("Error fetching discussion:", error);
    }
  }, [curr?.discussionId, page, hasMore]);

  useEffect(() => {
    fetchDiscussion();
  }, [fetchDiscussion]);

  useEffect(() => {
    if (page > 1) {
      fetchDiscussion();
    }
  }, [page]);

  const handleScroll = useCallback(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer?.scrollTop === 0 && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer?.addEventListener("scroll", handleScroll);
    return () => chatContainer?.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleSendMessage = async () => {
    try {
      await makeRequest.post("send-message-in-discussion", {
        discussionId: curr.discussionId,
        content: message,
        chapterCurriculumId: curr._id,
        messageType: "text",
      });

      setMessage(""); // Clear message input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Scroll to bottom when messages change (auto-scroll)
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer?.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]); // Only run when messages change

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="bg-white shadow-lg rounded-3xl w-full max-w-xl p-6 flex flex-col">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Chat on {chapter.title}
        </h2>
        <div className="flex items-end mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded-full mb-2"
            onClick={() =>
              navigate("/teacher-dashboard/chapterCurrs", { state: { curr } })
            }
          >
            <ArrowLeft />
          </button>
        </div>

        <div
          ref={chatContainerRef}
          className="flex-1 bg-gray-100 p-4 rounded-xl overflow-y-scroll max-h-[300px] space-y-4"
        >
          {messages.map((msg, index) => {
            const isSender =
              msg.senderDetails?.[0]?.email ===
              JSON.parse(localStorage.getItem("user")).user;
            return (
              <div
                key={index}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-3 max-w-[75%] rounded-xl text-sm transition-all duration-300 ${
                    isSender
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-800 shadow-md"
                  }`}
                >
                  {msg.senderDetails?.length > 0 && (
                    <div
                      className={`font-semibold text-sm ${isSender ? "text-white" : "text-gray-600"}`}
                    >
                      {!isSender &&
                        `${msg.senderDetails[0].firstName} ${msg.senderDetails[0].lastName}`}
                      {isSender && "You"}
                    </div>
                  )}

                  <div className="text-base mt-2">{msg.content}</div>

                  <div
                    className={`text-xs mt-1 ${isSender ? "text-white" : "text-gray-500"} text-right`}
                  >
                    <span>
                      {msg.timestamp
                        ? new Date(msg.timestamp).toLocaleString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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
            className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition"
          >
            <Send size={20} />
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
