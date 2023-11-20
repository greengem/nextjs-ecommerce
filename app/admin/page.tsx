import { auth } from "@/auth";
import PageHeading from "@/ui/Heading/PageHeading";

export default async function AdminPage() {
	const session = await auth();
	return (
		<>
			<PageHeading title='Admin Home' />
		</>
	)
}
