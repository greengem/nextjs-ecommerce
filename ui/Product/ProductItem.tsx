import Link from "next/link";
import Image from "next/image";
import { Product } from '@/types/ProductTypes';
import AddToCart from "./AddToCart";
import { Card, Inset, AspectRatio } from "@radix-ui/themes";

interface ProductItemProps {
    product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
    return (
        <Card>
            <Link href={`/products/${product.slug}`}>

            <Inset clip="padding-box" side="top" pb="current">
                <AspectRatio ratio={16 / 9}>
                    {product.imageUrl ? (
                        <Image 
                            src={product.imageUrl} 
                            alt={product.name} 
                            width={600} height={600}
                            className="block object-cover"
                        />
                    ) : (
                        <Image 
                            src="https://loremflickr.com/600/600" 
                            alt='placeholder' 
                            width={600} height={600}
                            className="block object-cover"
                        />
                    )}
                </AspectRatio>
            </Inset>

            </Link>
            <h2 className="text-lg font-semibold mb-3">{product.name}</h2>
            <p className='text-xs font-bold mb-3'>£{product.price}</p>
            <AddToCart productId={product.id} />
            
        </Card>
    )
}
