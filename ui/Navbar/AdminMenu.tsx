import Link from "next/link";

export default function AdminMenu() {
    return (
        <nav className="px-5 py-1 bg-red-500 text-white text-xs">
            <ul className="flex gap-2">
                <li>
                    <Link href="/admin">
                        Admin Home
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