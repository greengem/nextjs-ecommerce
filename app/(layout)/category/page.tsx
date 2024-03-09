import { getCategories } from '@/lib/FetchData';
import Link from 'next/link';
import PageHeading from '@/ui/Heading/PageHeading';

export default async function Products() {
    const categories = await getCategories();

    return (
        <>
            <PageHeading title="Categories" />

            <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
                {categories.map((category) => (
                    <div key={category.id}>
                        <Link href={`/category/${category.slug}`}>
                            {category.name}
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}
