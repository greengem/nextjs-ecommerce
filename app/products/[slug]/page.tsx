import prisma from '@/db/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/ProductTypes';
import PageHeading from '@/ui/Heading/PageHeading';

async function getProduct(slug: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
        where: {
            slug: slug,
        },
        select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            description: true,
            image: true,
            categories: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    image: true,
                }
            },
            tags: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                }
            }
        }
    });
    return product;
}

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
