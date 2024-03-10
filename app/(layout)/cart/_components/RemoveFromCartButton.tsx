'use client'
import { handleRemoveFromCart } from "@/server-actions/CartActions"
import { Button } from "@radix-ui/themes";
import { useTransition } from "react"

export default function RemoveFromCartButton({ cartItemId }: { cartItemId: string }) {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(() => {
            handleRemoveFromCart(cartItemId);
        });
    };

    return (
        <Button onClick={handleClick} disabled={isPending}>
            Remove from Cart
        </Button>
    )
}