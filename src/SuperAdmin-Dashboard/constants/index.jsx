import { Home, UserPlus, Building, Edit, MapPin } from "lucide-react";

import ProfileImage from "../assets/profile-image.jpg";
import ProductImage from "../assets/product-image.jpg";

export const navbarLinks = [
  {
    title: "SuperAdmin Dashboard",

       links: [
      {
        label: "Home",
        icon: Home, // Represents the main dashboard or landing page
        path: "/superadmin-dashboard",
        color: '#e74c3c'

      },
      {
        label: "Create Admin",
        icon: UserPlus, // Represents adding or creating a new admin
        path: "/superadmin-dashboard/createAdmin",
        color: '#4a90e2'

      },
      {
        label: "Organizations",
        icon: Building, // Represents organizations or business entities
        path: "/superadmin-dashboard/orgs",
        color: '#f39c12' 

      },
      {
        label: "Admin List",
        icon: Edit, // Represents updating an admin profile
        path: "/superadmin-dashboard/admins",
        color: '#e74c3c'
      },
      {
        label: "Create Region",
        icon: MapPin, // Represents updating an admin profile
        path: "/superadmin-dashboard/createRegion",
        color: '#3498db'
      },
    ],
  },
];
