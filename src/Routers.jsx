import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { ThemeProvider } from "./Dashboard/contexts/theme-context";
import Layout from "./Dashboard/routes/layout";
import DashboardPage from "./Dashboard/routes/dashboard/page";
import Content from "./Dashboard/routes/dashboard/Content";
import Profile from "./Dashboard/routes/dashboard/Profile";
import Singlecontent from "./Dashboard/routes/dashboard/Singlecontent";
import AdminLayout from "./Admin-Dashboard/routes/Adminlayout";
// import { AdminDashboardHeader } from "./Admin-Dashboard/layouts/AdminDashboardHeader";
import TeacherData from "./Pages/Teachers/TeacherData";
import StudentData from "./Pages/Students/StudentData";
import AddClass from "./Pages/AdminActivities/AddClass";
import AddSubject from "./Pages/AdminActivities/AddSubject";
import SuperAdminLayout from "./SuperAdmin-Dashboard/routes/SuperAdminlayout";
import AdminSignup from "./Pages/SuperAdminActivities/AdminSignup";
import { AdminDashboardHeader } from "./Admin-Dashboard/layouts/AdminDashboardHeader";
import AdminDashboard from "./Admin-Dashboard/routes/dashboard/page";
import SuperAdminDashboard from "./SuperAdmin-Dashboard/routes/dashboard/page";
import TeacherLayout from "./Teacher-Dashboard/routes/Teacherlayout";
import TeacherSignup from "./Pages/TeacherActivities/TeacherSignup";
import CreateAdmin from "./Pages/SuperAdminActivities/CreateAdmin";
import UpdateAdmin from "./Pages/SuperAdminActivities/UpdateAdmin";
import TeacherProfile from "./Pages/TeacherActivities/TeacherProfile1";
import Classes from "./Pages/AdminActivities/ClassAndSubject";
import Subject from "./Pages/AdminActivities/Subject";
import Organizations from "./Pages/SuperAdminActivities/Organizations";
import Cls from "./Pages/TeacherActivities/Cls";
import Students from "./Pages/TeacherActivities/Students";
import SubjectsList from "./Pages/TeacherActivities/SubjectsList";
import ChaptersList from "./Pages/TeacherActivities/ChaptersList";
import TProfile from "./Pages/TeacherActivities/TeacherData";
import AddChapter from "./Pages/TeacherActivities/AddChapter";
import CreateChapterCurriculum from "./Pages/TeacherActivities/CreateChapterCurriculum";
import UpdateAssignment from "./Pages/TeacherActivities/UpdateAssignment";
import UpdateChapter from "./Pages/TeacherActivities/UpdateChapter";
import UpdateChapterCurriculum from "./Pages/TeacherActivities/UpdateChapterCurriculum";
import AssignmentResult from "./Pages/TeacherActivities/AssignmentResult";
import ChapterCurr from "./Pages/TeacherActivities/ChapterCurr";
import AddAssignment from "./Pages/TeacherActivities/AddAssignment";
import Assignments from "./Pages/TeacherActivities/Assignments";
import TeacherDashboard from "./Teacher-Dashboard/routes/dashboard/page";
import Admins from "./Pages/SuperAdminActivities/Admins";
import CreateRegion from "./Pages/SuperAdminActivities/CreateRegion";
import GroupChatWindow from "./Pages/TeacherActivities/Chat/GroupChatWindow";
import ProfilePicUpload from "./Pages/TeacherActivities/ProfilePicUpload";
import Showemail from "./Pages/AdminActivities/Showemail";

const user = localStorage.getItem("user"); // Check if the user is logged in

const router = createBrowserRouter(
  [
    // Public routes accessible even if the user is not logged in
    {
      path: "/",
      element: <Login />,
    },

    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/register",
      element: <Register />,
    },

    // Protected routes (only accessible if the user is logged in)
    {
      path: "/dashboard", // Only accessible if the user is logged in
      element: <Layout />,
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },

        {
          path: "contents",
          element: <Content />,
        },
        {
          path: "contents/:id",
          element: <Singlecontent />,
        },

        {
          path: "/dashboard/profile",
          element: <Profile />,
        },
        {
          path: "customers",
          element: user ? <h1 className="title">Customers</h1> : <Home />,
        },
        {
          path: "new-customer",
          element: user ? <h1 className="title">New Customer</h1> : <Home />,
        },
        {
          path: "verified-customers",
          element: user ? (
            <h1 className="title">Verified Customers</h1>
          ) : (
            <Home />
          ),
        },
        {
          path: "products",
          element: user ? <h1 className="title">Products</h1> : <Home />,
        },
        {
          path: "new-product",
          element: user ? <h1 className="title">New Product</h1> : <Home />,
        },
        {
          path: "inventory",
          element: user ? <h1 className="title">Inventory</h1> : <Home />,
        },
        {
          path: "settings",
          element: user ? <h1 className="title">Settings</h1> : <Home />,
        },
      ],
    },

    // Protected routes (only accessible if the user is logged in)

    {
      path: "/admin-dashboard", // Only accessible if the user is logged in
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <AdminDashboard />,
        },

      ],
    },

    {
      path:"/add",
      element:<Showemail/>
    },
    {
      path: "/superadmin-dashboard",
      element: <SuperAdminLayout />,
      children: [
        {
          index: true,
          element: <SuperAdminDashboard />,
        },

        {
          path: "createAdmin",
          element: <CreateAdmin />,
        },
        {
          path: "orgs",
          element: <Organizations />,
        },
        {
          path: "admins/updateAdmin",
          element: <UpdateAdmin />,
        },
        {
          path: "admins",
          element: <Admins />,
        },
        {
          path: "createRegion",
          element: <CreateRegion />,
        },
      ],
    },
    {
      path: "/admin-dashboard", // Only accessible if the user is logged in
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <AdminDashboard />,
        },

        {
          path: "students",
          element: <StudentData />,
        },
        {
          path: "teachers",
          element: <TeacherData />,
        },
        {
          path: "class_subject/addclass",
          element: <AddClass />,
        },
        
        {
          path: "students",
          element: <StudentData />,
        },
        {
          path: "teachers",
          element: <TeacherData />,
        },
        {
          path: "class_subject",
          element: <Classes />,
        },
        {
          path: "class_subject/addSubject",
          element: <AddSubject />,
        },
        {
          path: "class_subject/subjects",
          element: <Subject />,
        },
      ],
    },
    {
      path: "/teacher-dashboard", // Only accessible if the user is logged in
      element: <TeacherLayout />,
      children: [
        {
          index: true,
          element: <TeacherDashboard />,
        },

        {
          path: "profile",
          element: <TeacherProfile />,
        },
        {
          path: "cls",
          element: <Cls />,
        },
        {
          path: "students",
          element: <Students />,
        },
        {
          path: "upload",
          element: <ProfilePicUpload />,
        },
        {
          path: "get_data",
          element: <TProfile />,
        },
        {
          path: "subjects",
          element: <SubjectsList />,
        },
        {
          path: "chapters",
          element: <ChaptersList />,
        },
        {
          path: "add_chapter",
          element: <AddChapter />,
        },
        {
          path: "chapterCurrs",
          element: <ChapterCurr />,
        },
        {
          path: "add_chapterCurr",
          element: <CreateChapterCurriculum />,
        },
        {
          path: "add_assignment",
          element: <AddAssignment />,
        },
        {
          path: "chapters/assignments",
          element: <Assignments />,
        },
        {
          path: "update_assignment",
          element: <UpdateAssignment />,
        },
        {
          path: "update_chapter",
          element: <UpdateChapter />,
        },
        {
          path: "update_chapterCurr",
          element: <UpdateChapterCurriculum />,
        },
        {
          path: "assignRes",
          element: <AssignmentResult />,
        },
        {
          path: "chapterCurrs/chat",
          element: <GroupChatWindow />,
        },
      ],
    },
  ],

  // Catch-all route for any unmatched paths
  {
    path: "*",
    element: <Error />,
  }
);

function Routers() {
  return (
    // <ThemeProvider storageKey="theme">
    <RouterProvider router={router} />
    // </ThemeProvider>
  );
}

export default Routers;
