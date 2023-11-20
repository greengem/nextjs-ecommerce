export interface Category {
    id: string;
    name: string;
    slug: string;
    image?: string | null;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    image?: string | null;
    categories: Category[];
}
