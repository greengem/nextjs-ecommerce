import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import Link from "next/link";

export default function AdminMenu() {

    if (!checkRole("admin")) {
        return null;
    }

    return (
        <nav className="px-5 py-1 bg-red-500 text-white text-xs">
            <ul className="flex gap-2">
                <li>
                    <Link href="/admin/dashboard">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/admin/orders">
                        Orders
                    </Link>
                </li>
                <li>
                    <Link href="/admin/products">
                        Products
                    </Link>
                </li>
                <li>
                    <Link href="/admin/users">
                        Users
                    </Link>
                </li>
            </ul>
        </nav>
    )
}