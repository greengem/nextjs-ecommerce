import { auth } from "@clerk/nextjs";
import prisma from "@/db/prisma";
import PageHeading from "@/ui/Heading/PageHeading";
import Table from "@/ui/Generic/Table";
import RemoveFromCartButton from "../cart/_components/RemoveFromCartButton";

export default async function Checkout() {
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
            <PageHeading title='Checkout' />
            <Table headers={headers} data={data} />
        </>
    )
}