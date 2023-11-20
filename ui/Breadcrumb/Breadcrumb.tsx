"use client";
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react';

export default function Breadcrumbs() {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean);
    const createBreadcrumbLink = (index: number) => {
        return '/' + pathSegments.slice(0, index + 1).join('/');
    };

    return (
        <nav className='bg-gray-200 px-5 py-1 text-sm'>
            <ol className='flex'>
                {pathSegments.map((segment, index) => (
                    <React.Fragment key={index}>
                        <li className='capitalize'>
                            {index === pathSegments.length - 1 ? (
                                <span>{segment}</span>
                            ) : (
                                <Link href={createBreadcrumbLink(index)}>
                                    {segment}
                                </Link>
                            )}
                        </li>
                        {index < pathSegments.length - 1 && (
                            <li className='mx-2'>{'>'}</li>
                        )}
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
}
