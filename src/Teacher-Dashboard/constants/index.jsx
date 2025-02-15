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
      },
      {
        label: "Classes", // Shortened label for clarity
        icon: Layers, // Represents classes, layers
        path: "/teacher-dashboard/cls",
      },
      {
        label: "Subjects", // Shortened label for clarity
        icon: BookOpen, // Icon represents academic materials
        path: "/teacher-dashboard/subjects",
      },
      {
        label: "Profile", // Shortened label for clarity
        icon: User, // More appropriate icon for user profile
        path: "/teacher-dashboard/get_data",
      },
      {
        label: "Course Content",
        icon: FileText,
        path: "/teacher-dashboard/chapters",
      },
      {
        label: "Curriculum & chat", 
        icon: FileText, 
        path: "/teacher-dashboard/chapterCurrs",
      },
    ],
  },
];

