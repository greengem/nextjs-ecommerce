import { auth } from "@clerk/nextjs";
import PageHeading from "@/ui/Heading/PageHeading";
import prisma from "@/db/prisma";
import RemoveFromCartButton from "./_components/RemoveFromCartButton";
import { Table } from "@radix-ui/themes";
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

    return (
        <>
            <PageHeading title='Cart' />
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
                            <Table.RowHeaderCell>{item.product.name}</Table.RowHeaderCell>
                            <Table.Cell>{item.quantity}</Table.Cell>
                            <Table.Cell><RemoveFromCartButton cartItemId={item.id} /></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <Link href="/checkout">Proceed to Checkout</Link>
        </>
    )
}