import { GraduationCap, NotepadTextDashed, BookA, Home, NotepadText, Settings, Users } from "lucide-react";

import ProfileImage from "../assets/profile-image.jpg";
import ProductImage from "../assets/product-image.jpg";

export const navbarLinks = [
    {
        title: "",
        links: [
            {
                label: "Dashboard",
                icon: Home,
                path: "/dashboard",
            },
            {
                label: "Scholarships",
                icon: GraduationCap,
                path: "/dashboard/scholarships",
            },
            {
                label: "Contents",
                icon: NotepadText,
                path: "/dashboard/contents",
            },
            {
                label: "Exam",
                icon: BookA,
                path: "/dashboard/exam",
            },
            {
                label: "Result",
                icon: NotepadTextDashed,
                path: "/dashboard/result",
            },
        ],
    },
    // {
    //     title: "Customers",
    //     links: [
    //         {
    //             label: "Customers",
    //             icon: Users,
    //             path: "/customers",
    //         },
    //         {
    //             label: "New customer",
    //             icon: UserPlus,
    //             path: "/new-customer",
    //         },
    //         {
    //             label: "Verified customers",
    //             icon: UserCheck,
    //             path: "/verified-customers",
    //         },
    //     ],
    // },
    // {
    //     title: "Products",
    //     links: [
    //         {
    //             label: "Products",
    //             icon: Package,
    //             path: "/products",
    //         },
    //         {
    //             label: "New product",
    //             icon: PackagePlus,
    //             path: "/new-product",
    //         },
    //         {
    //             label: "Inventory",
    //             icon: ShoppingBag,
    //             path: "/inventory",
    //         },
    //     ],
    // },
    {
        title: "Settings",
        links: [
            {
                label: "Settings",
                icon: Settings,
                path: "#",
            },
        ],
    },
];


