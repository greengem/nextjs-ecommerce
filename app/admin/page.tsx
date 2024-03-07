import { auth } from "@clerk/nextjs";
import PageHeading from "@/ui/Heading/PageHeading";

export default async function AdminPage() {
	const { userId } = auth();
	return (
		<>
			<PageHeading title='Admin Home' />
		</>
	)
}
