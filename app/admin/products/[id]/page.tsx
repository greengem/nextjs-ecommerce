import prisma from '@/db/prisma';
import PageHeading from '@/ui/Heading/PageHeading';
import AdminNewProductForm from './form.client';

export default async function AdminNewProductPage({ params }: { params: { id: string } }) {
	const categories = await prisma.category.findMany();
	const tags = await prisma.tag.findMany();

	let existingProduct = null;

	if (params.id !== 'new') {
		existingProduct = await prisma.product.findUnique({
			where: {
				id: params.id
			},
			include: {
				categories: true,
				tags: true,
			}
		});
	}

	//console.log(existingProduct);

	return (
		<>
			<PageHeading title='New Product' />
			<AdminNewProductForm categories={categories} tags={tags} existingProduct={existingProduct} />
		</>
	)
}
