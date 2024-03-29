import { getProducts } from "@/lib/FetchData";
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
import Link from 'next/link';
import DeleteProductButton from "./_components/DeleteProductButton";

export default async function AdminProductsPage() {
	const products = await getProducts();
	return (
		<>
			<PageHeading title='Products' />
			
			<Link href="/admin/products/new">New Product</Link>

			<AdminTable>
				<AdminTableHeader>
					<AdminTableHeaderItem><></></AdminTableHeaderItem>
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
									{product.imageUrl ? (
										<Image 
											src={product.imageUrl} 
											alt={product.name} 
											width={32} height={32}
											className='mb-1 rounded-full'
										/>
									) : (
										<Image 
											src="https://loremflickr.com/60/60" 
											alt='placeholder' 
											width={32} height={32}
											className='mb-1 rounded-full'
										/>
									)}
								</>
							</AdminTableBodyRowItem>
							<AdminTableBodyRowItem><Link href={`/products/${product.slug}`}>{product.name}</Link></AdminTableBodyRowItem>
							<AdminTableBodyRowItem>£{product.price}</AdminTableBodyRowItem>
							<AdminTableBodyRowItem>
								{product.categories.map(category => (
									<p key={category.id}>{category.name}</p>
								))}
							</AdminTableBodyRowItem>
							<AdminTableBodyRowItem>
								<ul>
								{product.tags.map(tag => (
									<li key={tag.id}>
										<Link href={`/tag/${tag.slug}`}>
											{tag.name}
										</Link>
									</li>
								))}
								</ul>
							</AdminTableBodyRowItem>
							<AdminTableBodyRowItem>
								<div className='flex gap-2'>
									<Link href={`/admin/products/${product.id}`}>Edit</Link>
									<DeleteProductButton productId={product.id} />
								</div>
							</AdminTableBodyRowItem>
						</AdminTableBodyRow>
					))}
				</AdminTableBody>
			</AdminTable>
		</>
	)
}
