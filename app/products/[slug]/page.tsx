import Image from 'next/image';
import Link from 'next/link';
import { getProduct } from "@/lib/FetchData";
import PageHeading from '@/ui/Heading/PageHeading';

export default async function Product({ params }: { params: { slug: string } }) {
    const product = await getProduct(params.slug);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <>
            <PageHeading title={product.name} />

            {product.image ? (
                <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={600} height={600}
                    className='mb-1'
                />
            ) : (
                <Image 
                    src="https://loremflickr.com/600/600" 
                    alt='placeholder' 
                    width={600} height={600}
                    className='mb-1'
                />
            )}
            <p>Name: {product.name}</p>
            <p className='text-xs'>{product.description}</p>
            <p className='text-xs font-bold'>£{product.price}</p>
            <ul>
                {product.categories.map(category => (
                    <li key={category.id}>
                        <Link href={`/category/${category.slug}`}>
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}
