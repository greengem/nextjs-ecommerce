import { getTags } from '@/lib/FetchData';
import Link from 'next/link';
import PageHeading from '@/ui/Heading/PageHeading';

export default async function Products() {
    const tags = await getTags();

    return (
        <>
            <PageHeading title='Tags' />
            
            <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
                {tags.map((tag) => (
                    <div key={tag.id}>
                        <Link href={`/tag/${tag.slug}`}>
                            {tag.name}
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}
