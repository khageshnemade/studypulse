import {
  Home,
  Layers,
  BookOpen,
  User,
  FileText,
} from "lucide-react"; // Using more appropriate icons

import ProfileImage from "../assets/profile-image.jpg";
import ProductImage from "../assets/product-image.jpg";

export const navbarLinks = [
  {
    title: "Teacher Dashboard",

    links: [
      {
        label: "Home", // Shortened label for clarity
        icon: Home, // Dashboard icon
        path: "/teacher-dashboard",
        color: '#e74c3c' 
      },
      {
        label: "Classes", // Shortened label for clarity
        icon: Layers, // Represents classes, layers
        path: "/teacher-dashboard/cls",
        color: '#8e44ad'  // Updated color
      },
      {
        label: "Subjects", // Shortened label for clarity
        icon: BookOpen, // Icon represents academic materials
        path: "/teacher-dashboard/subjects",
        color: '#f39c12' 
      },
      {
        label: "Course Content",
        icon: FileText,
        path: "/teacher-dashboard/chapters",
        color: '#e74c3c' 
      },
      {
        label: "Curriculum & Chat", 
        icon: FileText, 
        path: "/teacher-dashboard/chapterCurrs",
        color: '#2ecc71'  // Updated color
      },
    ]
    
  },
];

