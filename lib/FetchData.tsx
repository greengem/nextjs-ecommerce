import prisma from '@/db/prisma';
import { Product, Tag, Category } from '@/types/ProductTypes';
import { Order } from '@/types/OrderTypes';

// Get all products
export async function getProducts(): Promise<Product[]> {
    const products = await prisma.product.findMany({
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
        }
    });
    return products;
}

// Get all products by tag
export async function getProductsByTag(slug: string): Promise<Product[]> {
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
            },
        }
    });
    
    return products;
}

// Get all products by category
export async function getProductsByCategory(slug: string): Promise<{ products: Product[], categoryName: string }> {
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
            },
        }
    });

    const categoryName = products.length > 0 ? products[0].categories[0].name : 'Unknown Category';
    return { products, categoryName };
}

// Get a product by slug
export async function getProduct(slug: string): Promise<Product | null> {
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
            },
        }
    });
    return product;
}

export async function getTags(): Promise<Tag[]> {
    const tags = await prisma.tag.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
        }
    });
    return tags;
}

export async function getCategories(): Promise<Category[]> {
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
            image: true,
        }
    });
    return categories;
}

// Get all orders
export async function getOrders(): Promise<Order[]> {
    const orders = await prisma.order.findMany({
        select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            orderItems: {
                select: {
                    id: true,
                    quantity: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            }
        }
    });
    return orders;
}