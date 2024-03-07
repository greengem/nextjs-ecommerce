import { UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function AppNavbar() {
    const brandName = process.env.NEXT_PUBLIC_BRAND_NAME;
    const user = await currentUser()

    return (
        <nav className="px-5 py-3 bg-neutral-900 text-white grid grid-cols-[100px,1fr,100px]">
            <Link href="/" className="text-2xl tracking-tight font-light">{brandName}</Link>
            <ul className="flex gap-3 justify-center items-center">
                <li>
                    <Link href="/products">
                        Products
                    </Link>
                </li>
                <li>
                    <Link href="/category">
                        Categories
                    </Link>
                </li>
                <li>
                    <Link href="/tag">
                        Tags
                    </Link>
                </li>
            </ul>
            <div className="flex justify-end">
                <UserButton />
            </div>
        </nav>
    )
}