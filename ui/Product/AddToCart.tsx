'use client'
import { handleAddToCart } from "@/server-actions/CartActions";
import { Button } from "../Generic/Button";
import { useTransition } from "react";

export default function AddToCart({ productId } : { productId: string }) {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(() => {
            handleAddToCart(productId);
        });
    };

    return (
        <Button onClick={handleClick} disabled={isPending} className="w-full">
            Add to Cart
        </Button>
    )
}