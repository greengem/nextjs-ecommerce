
import CartDrawer from "@/ui/CartDrawer/CartDrawer";
import { UserButton } from "@clerk/nextjs";

export default async function HomePage() {
	return (
		<div>
			<UserButton />
		</div>
	);
}

