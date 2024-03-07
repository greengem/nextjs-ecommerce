import prisma from '@/db/prisma';
import PageHeading from '@/ui/Heading/PageHeading';
import AdminNewProductForm from './form.client';

export default async function AdminNewProductPage() {
	const categories = await prisma.category.findMany();
	const tags = await prisma.tag.findMany();

	return (
		<>
			<PageHeading title='New Product' />
			<AdminNewProductForm categories={categories} tags={tags} />
		</>
	)
}
