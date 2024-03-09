export interface Category {
    id: string;
    slug: string;
    name: string;
    image: string | null;
}

export interface Tag {
    id: string;
    slug: string;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    imageUrl: string | null;
    categories: Category[];
    tags: Tag[];
}