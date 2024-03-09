import { auth } from "@clerk/nextjs";
import prisma from "@/db/prisma";
import PageHeading from "@/ui/Heading/PageHeading";
import RemoveFromCartButton from "../cart/_components/RemoveFromCartButton";
import { Table, TableHeader, TableRow, TableCell } from "@/ui/Generic/Table";

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
        </>
    )
}