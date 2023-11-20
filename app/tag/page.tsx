import prisma from '@/db/prisma';
import Link from 'next/link';
import { Tag } from '@/types/ProductTypes';

async function getTags(): Promise<Tag[]> {
    const tags = await prisma.tag.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
        }
    });
    return tags;
}

export default async function Products() {
    const tags = await getTags();

    return (
        <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
            {tags.map((tag) => (
                <div key={tag.id}>
                    <Link href={`/tag/${tag.slug}`}>
                        {tag.name}
                    </Link>
                </div>
            ))}
        </div>
    )
}
