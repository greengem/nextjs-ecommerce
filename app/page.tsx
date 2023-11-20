import { auth } from "@/auth";
import { SignInButton, SignOutButton } from "@/ui/AuthButtons";

export default async function HomePage() {
	const session = await auth();

	if (!session) {
		return <SignInButton />
	} else {
		return (
			<>
				<SignOutButton />
				<pre>{JSON.stringify(session, null, 2)}</pre>
			</>
		)
	}


}

