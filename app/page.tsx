import prisma from "@/db/prisma";
import PageHeading from "@/ui/Heading/PageHeading";
import ProductItem from "@/ui/Product/ProductItem";
import { Tranquiluxe } from "uvcanvas"


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
			<div className="h-96 flex flex-col justify-center items-center relative">
                <Tranquiluxe />
				<h2 className="absolute text-7xl font-semibold tracking-tighter text-white">Spring Collection</h2>
			</div>
            
            <div className="p-5">
                <h2 className="text-3xl font-semibold tracking-tight text-center mb-3">New Arrivals</h2>

                <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
                    {products.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            </div>
		</>
	);
}

