import { Home, Users, UserCheck, GraduationCap, BookOpen } from "lucide-react"; // Importing icons relevant to your context

import ProfileImage from "../assets/profile-image.jpg";
import ProductImage from "../assets/product-image.jpg";

export const navbarLinks = [
  {
    title: "Admin Dashboard",
    links: [
      {
        label: "Home",
        icon: Home,
        path: "/admin-dashboard",
        color: "#2ecc71", // Green shade
      },
      {
        label: "Teachers",
        icon: UserCheck,
        path: "/admin-dashboard/teachers",
        color: "#f39c12", // Orange shade
      },
      {
        label: "Students",
        icon: Users,
        path: "/admin-dashboard/students",
        color: "#e74c3c", // Red shade
      },
      {
        label: "Classes & Subjects",
        icon: BookOpen,
        path: "/admin-dashboard/class_subject",
        color: "#1abc9c", // New teal color
      },
    ],
  },
];
