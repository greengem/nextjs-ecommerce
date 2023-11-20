import { auth } from "@/auth";
import Image from "next/image"
import Link from "next/link";

export default async function AppNavbar() {
    const session = await auth();
    const brandName = process.env.NEXT_PUBLIC_BRAND_NAME;

    return (
        <nav className="flex justify-between px-5 py-3 items-center border-b-2 border-black">
            <p><Link className="font-semibold" href="/">{brandName}</Link></p>
            <ul className="flex gap-3">
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
            </ul>
            {session?.user?.image && (
                <Image 
                src={session.user.image || '/default-avatar.png'}
                    width={32} height={32}
                    className="rounded-full"
                    alt="User Avatar"
                />
            )}
        </nav>
    )
}