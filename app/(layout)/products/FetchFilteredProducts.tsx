import prisma from "@/db/prisma";
import ProductItem from "@/ui/Product/ProductItem";

export default async function FetchFilteredProducts({
    search, sort, cat, tag, currentPage, perPage
} : {
    search?: string;
    sort?: string;
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

    // Determine the sorting method based on the `sort` prop
    const orderBy = [];
    if (sort) {
        const [field, order] = sort.split('_');
        orderBy.push({
            [field]: order
        });
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
        orderBy: orderBy, // Add the orderBy clause here
        skip: skip,
        take: perPage || undefined
    });

    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    )
}