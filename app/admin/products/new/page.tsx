import prisma from '@/db/prisma';
import { auth } from "@/auth";
import PageHeading from '@/ui/Heading/PageHeading';

export default async function AdminProductsPage() {
	const session = await auth();
	return (
		<PageHeading title='New Product' />
	)
}
