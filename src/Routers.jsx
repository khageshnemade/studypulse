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
import StudentsRegistered from "./Admin-Dashboard/routes/dashboard/StudentsRegistered";
import OnlineUsers from "./Pages/TeacherActivities/OnlineUsers";
import CreateNotification from "./Pages/AdminActivities/CreateNotification";
import Notifications from "./Pages/AdminActivities/Notifications";
import UploadedCount from "./Pages/AdminActivities/UploadedCount";
import AssignmentPassFailed from "./Pages/TeacherActivities/AssignmentPassFailed";
import AssignmentData from "./Admin-Dashboard/routes/dashboard/AssignmentData";
import StudentReport from "./Pages/AdminActivities/StudentReport";
import TeacherSubjectLimits from "./Pages/TeacherActivities/TeacherSubjectLimits";
import PieClick from "./Pages/AdminActivities/PieClick";
import Invoice from "./Invoice";
import RefreshToken from "./Admin-Dashboard/RefreshToken";
import AdminTeacherSalaryTable from "./Pages/AdminActivities/AdminTeacherSalaryTable";
import PaymentHistory from "./Pages/AdminActivities/PaymentHistory";
import SalaryOverview from "./Pages/AdminActivities/SalaryOverview";
import CreateTeacherPayment from "./Pages/AdminActivities/CreateTeacherPayment";
import PrivacyPolicy from "./Component/Privacy/PrivacyPolicy";
import UpdateOrganization from "./Pages/AdminActivities/UpdateOrganization";
import DeleteUserForm from "./Pages/TeacherActivities/DeleteUserForm";
import ContactForm from "./Component/Form/ContactForm";

const user = localStorage.getItem("user"); // Check if the user is logged in

const router = createBrowserRouter(
  [
    // Public routes accessible even if the user is not logged in
    { path: "/", element: <Login /> },
    { path: "/privacy", element: <PrivacyPolicy /> },

    { path: "/login", element: <Login /> },

    { path: "/register", element: <Register /> },
    
    // Protected routes (only accessible if the user is logged in)
    {
      path: "/dashboard", // Only accessible if the user is logged in
      element: <Layout />,
      children: [
        { index: true, element: <DashboardPage /> },
        
        { path: "contents", element: <Content /> },
        { path: "contents/:id", element: <Singlecontent /> },
        { path: "/dashboard/profile", element: <Profile /> },
        { path: "contact", element: <ContactForm /> },
        
      ],
    },

    { path: "/add", element: <Showemail /> },
    {
      path: "/superadmin-dashboard",
      element: <SuperAdminLayout />,
      children: [
        { index: true, element: <SuperAdminDashboard /> },

        { path: "createAdmin", element: <CreateAdmin /> },
        { path: "orgs", element: <Organizations /> },
        { path: "admins/updateAdmin", element: <UpdateAdmin /> },
        { path: "admins", element: <Admins /> },
        { path: "createRegion", element: <CreateRegion /> },
      ],
    },
    {
      path: "/admin-dashboard", // Only accessible if the user is logged in
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: "users", element: <OnlineUsers /> },
        { path: "subjects", element: <TeacherSubjectLimits /> },
        { path: "refreshToken", element: <RefreshToken /> },
        { path: "notifications", element: <Notifications /> },
        { path: "studentsReport", element: <StudentReport /> },
        // { path: "ass_stat", element: <AssignmentData /> },
        { path: "announce", element: <CreateNotification /> },
        { path: "update_notifications", element: <Notifications /> },
        { path: "counter", element: <UploadedCount /> },
        { path: "pieclick", element: <PieClick /> },
        { path: "students", element: <StudentData /> },
        { path: "student", element: <StudentsRegistered /> },
        { path: "teachers", element: <TeacherData /> },
        { path: "teachers/salaryData", element: <AdminTeacherSalaryTable /> },
        { path: "classes/addclass", element: <AddClass /> },
        { path: "classes", element: <Classes /> },
        { path: "classes/addSubject", element: <AddSubject /> },
        { path: "classes/subjects", element: <Subject /> },
        { path: "salary", element: <SalaryOverview /> },
        { path: "createpayment", element: <CreateTeacherPayment /> },
        { path: "paymentlist", element: <PaymentHistory /> },
        { path: "update", element: <UpdateOrganization /> },
      ],
    },
    {
      path: "/teacher-dashboard", // Only accessible if the user is logged in
      element: <TeacherLayout />,
      children: [
        { index: true, element: <TeacherDashboard /> },
        { path: "users", element: <OnlineUsers /> },
        { path: "resultClass", element: <AssignmentPassFailed /> },

        { path: "profile", element: <TeacherProfile /> },
        { path: "cls", element: <Cls /> },
        { path: "cls/students", element: <Students /> },
        { path: "upload", element: <ProfilePicUpload /> },
        { path: "get_data", element: <TProfile /> },
        { path: "subjects", element: <SubjectsList /> },
        { path: "chapters", element: <ChaptersList /> },
        { path: "chapters/add_chapter", element: <AddChapter /> },
        { path: "chapterCurrs", element: <ChapterCurr /> },
        {
          path: "chapterCurrs/add_chapterCurr",
          element: <CreateChapterCurriculum />,
        },
        { path: "add_assignment", element: <AddAssignment /> },
        { path: "chapters/assignments", element: <Assignments /> },
        {
          path: "chapters/assignments/update_assignment",
          element: <UpdateAssignment />,
        },
        { path: "chapters/update_chapter", element: <UpdateChapter /> },
        {
          path: "chapterCurrs/update_chapterCurr",
          element: <UpdateChapterCurriculum />,
        },
        {
          path: "chapters/assignments/assignRes",
          element: <AssignmentResult />,
        },
        {
          path: "delete",
          element: <DeleteUserForm />,
        },
        { path: "chapterCurrs/chat", element: <GroupChatWindow /> },
      ],
    },
  ],

  // Catch-all route for any unmatched paths
  { path: "*", element: <Error /> }
);

function Routers() {
  return (
    // <ThemeProvider storageKey="theme">
    <RouterProvider router={router} />
    // </ThemeProvider>
  );
}

export default Routers;
