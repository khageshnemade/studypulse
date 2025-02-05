import { Home, UserPlus, Building, Edit, MapPin } from "lucide-react";

import ProfileImage from "../assets/profile-image.jpg";
import ProductImage from "../assets/product-image.jpg";

export const navbarLinks = [
  {
    title: "",
    links: [
      {
        label: "Home",
        icon: Home, // Represents the main dashboard or landing page
        path: "/superadmin-dashboard",
      },
      {
        label: "Create Admin",
        icon: UserPlus, // Represents adding or creating a new admin
        path: "/superadmin-dashboard/createAdmin",
      },
      {
        label: "Organizations",
        icon: Building, // Represents organizations or business entities
        path: "/superadmin-dashboard/orgs",
      },
      {
        label: "Admin List",
        icon: Edit, // Represents updating an admin profile
        path: "/superadmin-dashboard/admins",
      },
      {
        label: "Create Region",
        icon: MapPin, // Represents updating an admin profile
        path: "/superadmin-dashboard/createRegion",
      },
    ],
  },
];
