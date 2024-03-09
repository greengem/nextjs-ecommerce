import { auth } from "@clerk/nextjs";
import PageHeading from "@/ui/Heading/PageHeading";
import prisma from "@/db/prisma";
import RemoveFromCartButton from "./_components/RemoveFromCartButton";
import { Table, TableHeader, TableRow, TableCell } from "@/ui/Generic/Table";
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
            <Table>
                <TableHeader headers={['Product Name', 'Quantity', 'Actions']} />
                <tbody>
                    {cartItems.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.product.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell><RemoveFromCartButton cartItemId={item.id} /></TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
            <Link href="/checkout">Proceed to Checkout</Link>
        </>
    )
}