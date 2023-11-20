import Link from "next/link";
import Image from "next/image";
import { Product } from '@/types/ProductTypes';

interface ProductItemProps {
    product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
    return (
        <div>
            <Link href={`/products/${product.slug}`}>
            {product.image ? (
                <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={600} height={600}
                    className='mb-1'
                />
            ) : (
                <Image 
                    src="https://loremflickr.com/600/600" 
                    alt='placeholder' 
                    width={600} height={600}
                    className='mb-1'
                />
            )}
            </Link>
            <h2>{product.name}</h2>
            <p>{product.slug}</p>
            <p className='text-xs'>{product.description}</p>
            <p className='text-xs font-bold'>£{product.price}</p>
            <p className="font-semibold">Categories: </p>
            <ul>
                {product.categories.map(category => (
                    <li key={category.id}>
                        <Link href={`/category/${category.slug}`}>
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <p className="font-semibold">Tags: </p>
            <ul>
                {product.tags.map(tag => (
                    <li key={tag.id}>
                        <Link href={`/category/${tag.slug}`}>
                            {tag.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
