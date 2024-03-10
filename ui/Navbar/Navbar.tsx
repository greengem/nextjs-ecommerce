import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import CartDrawer from "../CartDrawer/CartDrawer";
import { IconFlame } from "@tabler/icons-react";
import NavbarMenu from "./NavbarMenu";

function NavbarBrand() {
    const brandLogo = <IconFlame />;
    return (
        <Link href="/" className="text-xl tracking-tight font-light flex items-center">
            {brandLogo} {process.env.NEXT_PUBLIC_BRAND_NAME}
        </Link>
    )
}

export default function Navbar() {

    return (
        <nav className="px-5 py-3 bg-black text-white grid grid-cols-[100px,1fr,100px] shadow-md">
            <NavbarBrand />
            <NavbarMenu />
            <div className="flex justify-end gap-3">
                <CartDrawer />
                <UserButton />
            </div>
        </nav>
    )
}