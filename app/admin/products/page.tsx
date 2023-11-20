import prisma from '@/db/prisma';
import { auth } from "@/auth";
import { Product } from '@/types/ProductTypes';
import Image from 'next/image';
import PageHeading from '@/ui/Heading/PageHeading';

async function getProducts(): Promise<Product[]> {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            description: true,
            image: true,
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
    return products;
}

export default async function AdminProductsPage() {
	const session = await auth();
	const products = await getProducts();
	return (
		<>
			<PageHeading title='Products' />
			
			<table className="min-w-full table-auto border-collapse border border-gray-200">
				<thead className="bg-gray-100">
					<tr className='border-b border-gray-200 text-left text-sm font-semibold text-gray-600'>
						<th className='px-4 py-2'>Select</th>
						<th className='px-4 py-2'>Image</th>
						<th className='px-4 py-2'>Name</th>
						<th className='px-4 py-2'>Price</th>
						<th className='px-4 py-2'>Category</th>
						<th className='px-4 py-2'>Tags</th>
						<th className='px-4 py-2'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.id} className='border-b border-gray-200 text-sm text-gray-700'>
							<td className='px-4 py-2'><input type='checkbox' /></td>
							<td className='px-4 py-2'>
								<>
									{product.image ? (
										<Image 
											src={product.image} 
											alt={product.name} 
											width={32} height={32}
											className='mb-1'
										/>
									) : (
										<Image 
											src="https://loremflickr.com/60/60" 
											alt='placeholder' 
											width={32} height={32}
											className='mb-1'
										/>
									)}
								</>
							</td>
							<td className='px-4 py-2'>{product.name}</td>
							<td className='px-4 py-2'>£{product.price}</td>
							<td className='px-4 py-2'>
								{product.categories.map(category => (
									<p key={category.id}>{category.name}</p>
								))}
							</td>
							<td className='px-4 py-2'>
								<ul className='flex gap-2'>
								{product.tags.map(tag => (
									<li key={tag.id}>{tag.name}</li>
								))}
								</ul>
							</td>
							<td className='px-4 py-2'>
								<button>Edit</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
