import { auth } from "@clerk/nextjs";
import prisma from "@/db/prisma";
import PageHeading from "@/ui/Heading/PageHeading";
import RemoveFromCartButton from "../cart/_components/RemoveFromCartButton";
import { Table } from "@radix-ui/themes";

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

    return (
        <>
            <PageHeading title='Checkout' />
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                    <Table.ColumnHeaderCell>Product Name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {cartItems.map((item) => (
                    <Table.Row key={item.id}>
                        <Table.Cell>{item.product.name}</Table.Cell>
                        <Table.Cell>{item.quantity}</Table.Cell>
                        <Table.Cell><RemoveFromCartButton cartItemId={item.id} /></Table.Cell>
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </>
    )
}