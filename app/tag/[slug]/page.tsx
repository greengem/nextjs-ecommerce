import prisma from '@/db/prisma';
import { getProductsByTag } from '@/lib/FetchData';
import PageHeading from '@/ui/Heading/PageHeading';
import ProductItem from '@/ui/Product/ProductItem';

async function getTagName(slug: string) {
    const tag = await prisma.tag.findUnique({
        where: {
            slug: slug,
        },
        select: {
            name: true,
        }
    });
    return tag ? tag.name : '';
}

export default async function ProductsByTag({ params }: { params: { slug: string } }) {
    const tagName = await getTagName(params.slug)
    const products = await getProductsByTag(params.slug);

    if (!products) {
        return <div>Tag not found</div>;
    }

    return (
        <>
            <PageHeading title={`Tag: ${tagName}`} />
            <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}
