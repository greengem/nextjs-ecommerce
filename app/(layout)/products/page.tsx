import { getProducts } from "@/lib/FetchData";
import PageHeading from '@/ui/Heading/PageHeading';
import ProductItem from '@/ui/Product/ProductItem';

export default async function Products() {
    const products = await getProducts();

    return (
        <>
            <PageHeading title='Products' />

            <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}
