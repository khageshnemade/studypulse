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
    title: "Admin Dashboard",
    links: [
      {
        label: "Home", 
        icon: Home, 
        path: "/admin-dashboard",
        color: '#4a90e2'
      },
      {
        label: "Teachers", 
        icon: UserCheck, 
        path: "/admin-dashboard/teachers",
        color: '#f39c12' 
      },
      {
        label: "Students", 
        icon: Users,
        path: "/admin-dashboard/students",
        color: '#e74c3c' 
      },
      {
        label: "Classes & Subjects",
        icon: BookOpen, 
        path: "/admin-dashboard/class_subject",
        color: '#3498db'
      },
    ]    
  },
];
