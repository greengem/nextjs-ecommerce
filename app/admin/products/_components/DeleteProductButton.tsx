'use client'
import { handleDeleteProduct } from "@/server-actions/ProductActions"
import { Button } from "@/ui/Generic/Button"

export default function DeleteProductButton({ productId } : { productId: string }) {
    return (
        <Button
            onClick={async () => {
                if (window.confirm('Are you sure you want to delete this product?')) {
                    handleDeleteProduct(productId)
                }
            }}
        >
            Delete
        </Button>
    )
}
