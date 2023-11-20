import prisma from '@/db/prisma';
import { Product } from '@/types/ProductTypes';
import ProductItem from '@/ui/Product/ProductItem';

async function getProducts(slug: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
        where: {
            tags: {
                some: {
                    slug: slug,
                }
            }
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
    return products;
}

export default async function ProductsByTag({ params }: { params: { slug: string } }) {
    const products = await getProducts(params.slug);

    if (!products) {
        return <div>Tag not found</div>;
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    )
}
