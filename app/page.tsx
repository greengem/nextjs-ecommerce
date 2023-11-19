import { auth } from "@/auth";
import { SignInButton, SignOutButton } from "./_components/AuthButtons";
export default async function HomePage() {
	const session = await auth();

	if (!session) {
		return <SignInButton />
	} else {
		return (
			<>
				<SignOutButton />
				<pre>{JSON.stringify(session, null, 2)}</pre>
				<ul>
					<li>email {session.user?.email}</li>
					<li>id {session.user?.id}</li>
				</ul>
			</>
		)
	}


}

