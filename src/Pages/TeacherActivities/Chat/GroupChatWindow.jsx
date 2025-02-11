import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { makeRequest } from "../../../axios";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import EmojiPicker from 'emoji-picker-react'; 

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
  const [isAtBottom, setIsAtBottom] = useState(true); // Track if the user is at the bottom
  const navigate = useNavigate();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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

  const handleEmojiClick = (emoji) => {
    setMessage(message + emoji.emoji); // Add the selected emoji to the message input
    setShowEmojiPicker(false); // Close the emoji picker after selection
  };

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
    const isBottom = chatContainer?.scrollHeight === chatContainer?.scrollTop + chatContainer?.clientHeight;
    setIsAtBottom(isBottom); // Update if the user is at the bottom

    if (chatContainer?.scrollTop === 0 && hasMore) {
      setPage((prev) => prev + 1); // Load more messages if at the top
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

  useEffect(() => {
    if (isAtBottom) {
      const chatContainer = chatContainerRef.current;
      chatContainer?.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isAtBottom]);

  const scrollToLatest = () => {
    const chatContainer = chatContainerRef.current;
    chatContainer?.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col h-screen rounded-2xl bg-gray-50">
      {/* Header */}
      <div className="flex items-center space-x-4 p-2 sticky top-[-25px] rounded-t-md bg-white shadow-xl z-10">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
          onClick={() =>
            navigate("/teacher-dashboard/chapterCurrs", { state: { curr } })
          }
        >
          <ArrowLeft />
        </button>
        <h2 className="text-xl font-semibold text-center text-gray-800 flex-grow">
          Chat on {chapter.title}
        </h2>
        <div className="w-8"></div>
      </div>

      {/* Chat container */}
      <div
        ref={chatContainerRef}
        className="flex-1 bg-white p-4 rounded-xl overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
      >
        {/* Chat messages */}
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
                className={`px-6 py-4 max-w-[80%] rounded-xl text-sm transition-all duration-300 ${
                  isSender
                    ? "bg-green-600 text-white shadow-xl"
                    : "bg-gray-100 text-gray-800 shadow-md"
                }`}
              >
                {msg.senderDetails?.length > 0 && (
                  <div
                    className={`font-semibold text-sm ${
                      isSender ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {!isSender &&
                      `${msg.senderDetails[0].firstName} ${msg.senderDetails[0].lastName}`}
                    {isSender && "You"}
                  </div>
                )}

                <div className="text-base mt-2">{msg.content}</div>

                <div
                  className={`text-xs mt-1 ${
                    isSender ? "text-white" : "text-gray-500"
                  } text-right`}
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

      {/* Scroll to Latest Button */}
      {!isAtBottom && (
        <button
          onClick={scrollToLatest}
          className="fixed bottom-24 right-8 bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-all duration-300"
        >
          <MessageCircle />
        </button>
      )}

      {/* Send message button inside the chat */}
      <div className="flex items-center space-x-4 p-2 bg-slate-200 rounded-b-2xl shadow-xl sticky bottom-[-22px] z-10">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)} // Toggle emoji picker visibility
          className="text-xl text-gray-600 p-2"
        >
          😊
        </button>

        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-all duration-300"
        >
          <Send size={22} />
        </button>
      </div>

      {/* Show emoji picker when state is true */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default GroupChatWindow;





// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// import { makeRequest } from "../../../axios";
// import { ArrowLeft, MessageCircle, Send } from "lucide-react";

// let socket;

// const GroupChatWindow = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [discussionId, setDiscussionId] = useState("");
//   const [unreadMessages, setUnreadMessages] = useState(0); // Track unread messages count
//   const location = useLocation();
//   const { curr, chapter } = location.state || {};
//   const [page, setPage] = useState(1);
//   const chatContainerRef = useRef(null);
//   const [hasMore, setHasMore] = useState(true);
//   const [isAtBottom, setIsAtBottom] = useState(true); // Track if the user is at the bottom
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (curr?.discussionId) {
//       setDiscussionId(curr.discussionId);
//     }
//   }, [curr]);

//   useEffect(() => {
//     if (discussionId) {
//       socket = io("wss://api.studypulse.live", {
//         path: "/socket.io",
//         forceNew: true,
//         reconnectionAttempts: 3,
//         timeout: 2000,
//       });

//       socket.emit("join-discussion", { discussionId });
//       console.log(`Joined discussion: ${discussionId}`);

//       socket.on("get-message", (message) => {
//         console.log("Received message:", message);
//         setMessages((prev) => [
//           ...prev,
//           {
//             ...message,
//             senderDetails: [message.senderDetails],
//             timestamp: new Date().toISOString(),
//           },
//         ]);

//         // If user is not at the bottom, increase the unread message count
//         if (!isAtBottom) {
//           setUnreadMessages((prev) => prev + 1);
//         }
//       });

//       return () => {
//         socket.off("get-message");
//         socket.disconnect();
//       };
//     }
//   }, [discussionId, isAtBottom]);

//   const fetchDiscussion = useCallback(async () => {
//     if (!curr?.discussionId || !hasMore) return;

//     try {
//       const res = await makeRequest.get(
//         `get-discussions?discussionId=${curr.discussionId}&limit=10&page=${page}`
//       );
//       const newMessages = res?.data.data || [];

//       if (newMessages.length === 0) {
//         setHasMore(false); // No more messages
//       }

//       setMessages((prev) => [...newMessages.reverse(), ...prev]);
//     } catch (error) {
//       console.error("Error fetching discussion:", error);
//     }
//   }, [curr?.discussionId, page, hasMore]);

//   useEffect(() => {
//     fetchDiscussion();
//   }, [fetchDiscussion]);

//   useEffect(() => {
//     if (page > 1) {
//       fetchDiscussion();
//     }
//   }, [page]);

//   const handleScroll = useCallback(() => {
//     const chatContainer = chatContainerRef.current;
//     const isBottom = chatContainer?.scrollHeight === chatContainer?.scrollTop + chatContainer?.clientHeight;
//     setIsAtBottom(isBottom); // Update if the user is at the bottom

//     if (chatContainer?.scrollTop === 0 && hasMore) {
//       setPage((prev) => prev + 1); // Load more messages if at the top
//     }
//   }, [hasMore]);

//   useEffect(() => {
//     const chatContainer = chatContainerRef.current;
//     chatContainer?.addEventListener("scroll", handleScroll);
//     return () => chatContainer?.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const handleSendMessage = async () => {
//     try {
//       await makeRequest.post("send-message-in-discussion", {
//         discussionId: curr.discussionId,
//         content: message,
//         chapterCurriculumId: curr._id,
//         messageType: "text",
//       });

//       setMessage(""); // Clear message input after sending
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   // Scroll to bottom when messages change (auto-scroll)
//   useEffect(() => {
//     if (isAtBottom) {
//       const chatContainer = chatContainerRef.current;
//       chatContainer?.scrollTo({
//         top: chatContainer.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [messages, isAtBottom]); // Only scroll if user is at the bottom

//   // Scroll to latest message when user clicks the button
//   const scrollToLatest = () => {
//     const chatContainer = chatContainerRef.current;
//     chatContainer?.scrollTo({
//       top: chatContainer.scrollHeight,
//       behavior: "smooth",
//     });
//     setUnreadMessages(0); // Reset unread message count when user clicks to scroll to latest message
//   };

//   return (
//     <div className="flex flex-col h-screen rounded-md bg-gray-50">
//       {/* Header */}
//       <div className="flex items-center space-x-4 p-2 sticky top-[-25px] rounded-t-md bg-white shadow-xl z-10">
//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
//           onClick={() =>
//             navigate("/teacher-dashboard/chapterCurrs", { state: { curr } })
//           }
//         >
//           <ArrowLeft />
//         </button>
//         <h2 className="text-xl font-semibold text-center text-gray-800 flex-grow">
//           Chat on {chapter.title}
//         </h2>
//         <div className="w-8"></div> {/* Placeholder for alignment */}
//       </div>

//       {/* Chat container */}
//       <div
//         ref={chatContainerRef}
//         className="flex-1 bg-white p-4 rounded-xl overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
//       >
//         {/* Chat messages */}
//         {messages.map((msg, index) => {
//           const isSender =
//             msg.senderDetails?.[0]?.email ===
//             JSON.parse(localStorage.getItem("user")).user;
//           return (
//             <div
//               key={index}
//               className={`flex ${isSender ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`px-6 py-4 max-w-[80%] rounded-xl text-sm transition-all duration-300 ${
//                   isSender
//                     ? "bg-green-600 text-white shadow-xl"
//                     : "bg-gray-100 text-gray-800 shadow-md"
//                 }`}
//               >
//                 {msg.senderDetails?.length > 0 && (
//                   <div
//                     className={`font-semibold text-sm ${
//                       isSender ? "text-white" : "text-gray-600"
//                     }`}
//                   >
//                     {!isSender &&
//                       `${msg.senderDetails[0].firstName} ${msg.senderDetails[0].lastName}`}
//                     {isSender && "You"}
//                   </div>
//                 )}

//                 <div className="text-base mt-2">{msg.content}</div>

//                 <div
//                   className={`text-xs mt-1 ${isSender ? "text-white" : "text-gray-500"} text-right`}
//                 >
//                   <span>
//                     {msg.timestamp
//                       ? new Date(msg.timestamp).toLocaleString()
//                       : "N/A"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Scroll to Latest Button */}
//       {unreadMessages > 0 && (
//         <button
//           onClick={scrollToLatest}
//           className="fixed bottom-24 right-8 bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-all duration-300"
//         >
//           <MessageCircle size={24} />
//           {unreadMessages > 0 && (
//             <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//               {unreadMessages}
//             </span>
//           )}
//         </button>
//       )}

//       {/* Send message button inside the chat */}
//       <div className="flex items-center space-x-4 p-2 bg-slate-200 rounded-b-md shadow-xl sticky bottom-[-22px] z-10">
//         <input
//           type="text"
//           className="flex-grow p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
//           placeholder="Type a message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-all duration-300"
//         >
//           <Send size={22} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GroupChatWindow;
