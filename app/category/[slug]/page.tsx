import prisma from '@/db/prisma';
import { Product } from '@/types/ProductTypes';
import PageHeading from '@/ui/Heading/PageHeading';
import ProductItem from '@/ui/Product/ProductItem';

async function getProducts(slug: string): Promise<{ products: Product[], categoryName: string }> {
    const products = await prisma.product.findMany({
        where: {
            categories: {
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

    const categoryName = products.length > 0 ? products[0].categories[0].name : 'Unknown Category';
    return { products, categoryName };
}

export default async function ProductsByCategory({ params }: { params: { slug: string } }) {
    const { products, categoryName } = await getProducts(params.slug);

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
