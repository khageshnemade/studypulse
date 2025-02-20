import Routers from "./Routers";
import { RouterProvider } from "react-router-dom";

//import { ThemeProvider } from "@dashboard/contexts/theme-context";
import { ThemeProvider } from "./Dashboard/contexts/theme-context";



// import Layout from "./Dashboard/routes/layout";
// import DashboardPage from "./Dashboard/routes/dashboard/page";

function App() {
  return (
    <>
      <Routers />
      {/* 
      <ThemeProvider storageKey="theme">
        <RouterProvider router={router} />
      </ThemeProvider> */}
     

    </>
  );
}

export default App;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';

// const App = () => {
//   const [watchHistory, setWatchHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch the watch history from the backend
//     axios
//       .get('http://localhost:5000/api/history')
//       .then((response) => {
//         setWatchHistory(response.data.watchHistory);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching watch history:', error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="App">
//       <h1>YouTube Watch History</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           {watchHistory.length > 0 ? (
//             <ul>
//               {watchHistory.map((video, index) => (
//                 <li key={index}>
//                   <a href={video.url} target="_blank" rel="noopener noreferrer">
//                     {video.title}
//                   </a>
//                   <span> - {new Date(video.timestamp).toLocaleString()}</span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No watch history found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;