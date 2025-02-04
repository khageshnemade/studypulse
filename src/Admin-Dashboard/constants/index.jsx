import {
  Home,
  Users,
  UserCheck,
  GraduationCap,
  BookOpen,
} from "lucide-react"; // Importing icons relevant to your context

import ProfileImage from "../assets/profile-image.jpg";
import ProductImage from "../assets/product-image.jpg";

export const navbarLinks = [
  {
    title: "Dashboard",
    links: [
      {
        label: "Home", // Shortened and clear label
        icon: Home, // Icon for the main dashboard or landing page
        path: "/admin-dashboard",
      },
      {
        label: "Teachers", // Shortened and relevant label
        icon: UserCheck, // Icon representing teachers or multiple users
        path: "/admin-dashboard/teachers",
      },
      {
        label: "Students", // Shortened and relevant label
        icon: Users, // Icon representing students (graduation cap)
        path: "/admin-dashboard/students",
      },
      {
        label: "Classes & Subjects", // Shortened and more descriptive label
        icon: BookOpen, // Icon representing academic materials (books)
        path: "/admin-dashboard/class_subject",
      },
    ],
  },
];
