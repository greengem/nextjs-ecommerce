import { auth } from "@clerk/nextjs";
import PageHeading from "@/ui/Heading/PageHeading";
import prisma from "@/db/prisma";
import RemoveFromCartButton from "./_components/RemoveFromCartButton";
import Table from "@/ui/Generic/Table";
import Link from "next/link";

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
        },
    });

    const headers = ['Product Name', 'Quantity', 'Actions'];
    const data = cartItems.map(item => [
        item.product.name, 
        item.quantity, 
        <RemoveFromCartButton cartItemId={item.id} />
    ]);

    return (
        <>
        <PageHeading title='Cart' />
        <Table headers={headers} data={data} />
        <Link href="/checkout">Proceed to Checkout</Link>
        </>
    )
}