import { getProductsByCategory } from '@/lib/FetchData';
import PageHeading from '@/ui/Heading/PageHeading';
import ProductItem from '@/ui/Product/ProductItem';

export default async function ProductsByCategory({ params }: { params: { slug: string } }) {
    const { products, categoryName } = await getProductsByCategory(params.slug);

    if (!products) {
        return <div>Category not found</div>;
    }

    return (
        <>
            <PageHeading title={`Category: ${categoryName}`} />

            <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}
