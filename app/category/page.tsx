import prisma from '@/db/prisma';
import Link from 'next/link';
import { Category } from '@/types/ProductTypes';

async function getCategories(): Promise<Category[]> {
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
        }
    });
    return categories;
}

export default async function Products() {
    const categories = await getCategories();

    return (
        <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
            {categories.map((category) => (
                <div key={category.id}>
                    <Link href={`/category/${category.slug}`}>
                        {category.name}
                    </Link>
                </div>
            ))}
        </div>
    )
}
