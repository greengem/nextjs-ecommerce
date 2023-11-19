import { auth } from "@/auth";
import Image from "next/image"
import Link from "next/link";

export default async function AppNavbar() {
    const session = await auth();
    const brandName = process.env.NEXT_PUBLIC_BRAND_NAME;

    return (
        <nav className="bg-black text-white flex justify-between px-5 py-3 items-center">
            <p><Link className="font-semibold" href="/">{brandName}</Link></p>
            <ul>
                <li>
                    <Link href="/products">
                        Products
                    </Link>
                </li>
            </ul>
            {session?.user?.image && (
                <Image 
                src={session.user.image || '/default-avatar.png'}
                    width={42} height={42}
                    className="rounded-full"
                    alt="User Avatar"
                />
            )}
        </nav>
    )
}