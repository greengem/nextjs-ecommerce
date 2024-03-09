import prisma from "@/db/prisma";
import ProductItem from "@/ui/Product/ProductItem";
export default async function HomePage() {

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

	return (
		<>
			<div className="h-96 bg-neutral-200 flex flex-col justify-center items-center">
				<h2 className="text-6xl font-semibold tracking-tighter">Spring Collection</h2>
			</div>

            <div className='p-5 grid grid-cols-1 md:grid-cols-5 gap-5'>
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
		</>
	);
}

