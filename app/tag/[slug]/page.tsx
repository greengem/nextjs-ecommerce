import { getProductsByTag } from '@/lib/FetchData';
import PageHeading from '@/ui/Heading/PageHeading';
import ProductItem from '@/ui/Product/ProductItem';

export default async function ProductsByTag({ params }: { params: { slug: string } }) {
    const { products, tagName } = await getProductsByTag(params.slug);

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
