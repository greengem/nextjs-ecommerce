import { auth } from "@clerk/nextjs";
import PageHeading from "@/ui/Heading/PageHeading";
import prisma from "@/db/prisma";
import RemoveFromCartButton from "./_components/RemoveFromCartButton";

export default async function Cart() {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const cartItems = await prisma.cartItem.findMany({
        where: {
            cart: {
                userId: userId
            }
        },
        include: {
            product: true,
    });

    return (
        <>
        <PageHeading title='Cart' />
        <ul>
            {cartItems.map((item) => (
            <li key={item.id}>
                <p>{item.product.name} - Quantity: {item.quantity}</p>
                <RemoveFromCartButton cartItemId={item.id} />
            </li>
            ))}
        </ul>
        </>
    )
}