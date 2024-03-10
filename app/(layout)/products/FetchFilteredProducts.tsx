import prisma from "@/db/prisma";
import ProductItem from "@/ui/Product/ProductItem";

export default async function FetchFilteredProducts({
    search, cat, tag, currentPage, perPage
} : {
    search?: string;
    cat?: string[];
    tag?: string[];
    currentPage?: number;
    perPage?: number;
}) {
    const skip = currentPage && perPage ? (currentPage - 1) * perPage : 0;
    
    const whereClause: any = {};
    
    if (search) {
        whereClause.AND = search.split(' ').map((word) => ({
            name: {
                contains: word,
                mode: "insensitive"
            }
        }));
    }
    
    if (cat && cat.length > 0) {
        whereClause.categories = {
            some: {
                slug: {
                    in: cat
                }
            }
        };
    }
    
    if (tag && tag.length > 0) {
        whereClause.tags = {
            some: {
                slug: {
                    in: tag
                }
            }
        };
    }

    const products = await prisma.product.findMany({
        where: whereClause,
        select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            description: true,
            imageUrl: true,
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
        },
        skip: skip,
        take: perPage || undefined
    });

    return (
        <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    )
}