export interface Category {
    id: string;
    name: string;
    slug: string;
    image?: string | null;
}

export interface Tag {
    id: string;
    name: string;
    slug: string;
}

export interface Inventory {
    id: string;
    quantity: number;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    image?: string | null;
    categories: Category[];
    tags: Tag[];
    inventory: Inventory[];
}
