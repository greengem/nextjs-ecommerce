export interface Product {
    id: string;
    name: string;
}

export interface OrderItem {
    id: string;
    quantity: number;
    product: Product;
}

export interface Order {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    orderItems: OrderItem[];
}
