import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import Link from "next/link";

export default function AdminMenu() {

    if (!checkRole("admin")) {
        return null;
    }

    const menuItems = [
        { href: "/admin/dashboard", label: "Dashboard" },
        { href: "/admin/orders", label: "Orders" },
        { href: "/admin/products", label: "Products" },
        { href: "/admin/users", label: "Users" },
        { href: "/admin/gallery", label: "Gallery"}
    ];

    return (
        <nav className="px-5 py-1 bg-red-500 text-white text-xs">
            <ul className="flex gap-2">
                {menuItems.map((item) => (
                    <li key={item.href}>
                        <Link href={item.href}>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
