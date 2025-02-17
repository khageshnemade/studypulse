import Routers from "./Routers";
import { RouterProvider } from "react-router-dom";

//import { ThemeProvider } from "@dashboard/contexts/theme-context";
import { ThemeProvider } from "./Dashboard/contexts/theme-context";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';;

// import Layout from "./Dashboard/routes/layout";
// import DashboardPage from "./Dashboard/routes/dashboard/page";

function App() {
  return (
    <>
<ToastContainer/>
      <Routers />
      {/* 
      <ThemeProvider storageKey="theme">
        <RouterProvider router={router} />
      </ThemeProvider> */}
    </>
  );
}

export default App;
