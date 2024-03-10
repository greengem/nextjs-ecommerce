'use client'
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function NavbarMenu() {
    const pathname = usePathname()
    console.log(pathname)

    const links = [
        { href: '/products', text: 'Products' },
        { href: '/category', text: 'Categories' },
        { href: '/tag', text: 'Tags' },
        { href: '/cart', text: 'Cart' },
    ];

    return (
        <ul className="flex gap-3 justify-center items-center">
            {links.map((link, index) => (
                <li key={index}>
                    <Link 
                        href={link.href}
                        className={clsx(
                            "text-sm",
                            pathname === link.href ? "text-red-500" : "text-neutral-300"
                        )}
                    >
                        {link.text}
                    </Link>
                </li>
            ))}
        </ul>
    )
}