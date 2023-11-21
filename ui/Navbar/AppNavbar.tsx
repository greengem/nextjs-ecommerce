import { auth } from "@/auth";
import Image from "next/image"
import Link from "next/link";

export default async function AppNavbar() {
    const session = await auth();
    const brandName = process.env.NEXT_PUBLIC_BRAND_NAME;

    return (
        <nav className="flex justify-between px-5 py-3 items-center bg-gray-200">
            <p className="w-32 text-lg"><Link className="font-bold" href="/">{brandName}</Link></p>
            <ul className="flex gap-3 font-semibold">
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
            {session?.user?.image && (
                <div className="w-32 flex justify-end">
                    <Image 
                        src={session.user.image || '/default-avatar.png'}
                        width={32} height={32}
                        className="rounded-full"
                        alt="User Avatar"
                    />
                </div>
            )}
        </nav>
    )
}