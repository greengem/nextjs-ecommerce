import prisma from '@/db/prisma';
import { auth } from "@/auth";
import { Product } from '@/types/ProductTypes';
import Image from 'next/image';
import PageHeading from '@/ui/Heading/PageHeading';
import { 
	AdminTable, 
	AdminTableHeader, 
	AdminTableHeaderItem, 
	AdminTableBody, 
	AdminTableBodyRow, 
	AdminTableBodyRowItem 
} from '@/ui/Admin/Table';

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
			
			<AdminTable>
				<AdminTableHeader>
					<AdminTableHeaderItem>Select</AdminTableHeaderItem>
					<AdminTableHeaderItem>Image</AdminTableHeaderItem>
					<AdminTableHeaderItem>Name</AdminTableHeaderItem>
					<AdminTableHeaderItem>Price</AdminTableHeaderItem>
					<AdminTableHeaderItem>Category</AdminTableHeaderItem>
					<AdminTableHeaderItem>Tags</AdminTableHeaderItem>
					<AdminTableHeaderItem>Actions</AdminTableHeaderItem>
				</AdminTableHeader>
				<AdminTableBody>
					{products.map((product) => (
						<AdminTableBodyRow key={product.id}>
							<AdminTableBodyRowItem><input type='checkbox' /></AdminTableBodyRowItem>
							<AdminTableBodyRowItem>
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
							</AdminTableBodyRowItem>
							<AdminTableBodyRowItem>{product.name}</AdminTableBodyRowItem>
							<AdminTableBodyRowItem>£{product.price}</AdminTableBodyRowItem>
							<AdminTableBodyRowItem>
								{product.categories.map(category => (
									<p key={category.id}>{category.name}</p>
								))}
							</AdminTableBodyRowItem>
							<AdminTableBodyRowItem>
								<ul className='flex gap-2'>
								{product.tags.map(tag => (
									<li key={tag.id}>{tag.name}</li>
								))}
								</ul>
							</AdminTableBodyRowItem>
							<AdminTableBodyRowItem>
								<button>Edit</button>
							</AdminTableBodyRowItem>
						</AdminTableBodyRow>
					))}
				</AdminTableBody>
			</AdminTable>
		</>
	)
}
