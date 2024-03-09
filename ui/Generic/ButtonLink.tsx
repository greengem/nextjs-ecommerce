'use client'
import clsx from 'clsx';
import Link from 'next/link';

type ButtonLinkProps = {
    children: React.ReactNode;
    href: string;
    disabled?: boolean;
};
  
export function ButtonLink({ children, href, disabled  }: ButtonLinkProps) {
    return (
        <Link
            href={href}
            className={clsx(
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs",
                { "opacity-50": disabled }
            )}
        >
            {children}
        </Link>
    );
}