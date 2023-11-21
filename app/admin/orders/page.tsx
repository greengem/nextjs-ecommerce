import prisma from '@/db/prisma';
import { auth } from "@/auth";
import Image from 'next/image';
import PageHeading from '@/ui/Heading/PageHeading';
import { Order } from '@/types/OrderTypes';
import { format } from 'date-fns';
import { 
	AdminTable, 
	AdminTableHeader, 
	AdminTableHeaderItem, 
	AdminTableBody, 
	AdminTableBodyRow, 
	AdminTableBodyRowItem 
} from '@/ui/Admin/Table';
import Button from '@/ui/Button';

async function getOrders(): Promise<Order[]> {
    const orders = await prisma.order.findMany({
        select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            orderItems: {
                select: {
                    id: true,
                    quantity: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            }
        }
    });
    return orders;
}

export default async function AdminUsersPage() {
	const session = await auth();
	const orders = await getOrders();
	return (
		<>
			<PageHeading title='Orders' />
			
			<AdminTable>
				<AdminTableHeader>
					<AdminTableHeaderItem>Select</AdminTableHeaderItem>
					<AdminTableHeaderItem>Order ID</AdminTableHeaderItem>
					<AdminTableHeaderItem>Created</AdminTableHeaderItem>
					<AdminTableHeaderItem>Updated</AdminTableHeaderItem>
					<AdminTableHeaderItem>Actions</AdminTableHeaderItem>
				</AdminTableHeader>
				<AdminTableBody>
					{orders.map((order) => (
						<AdminTableBodyRow key={order.id}>
							<AdminTableBodyRowItem><input type='checkbox' /></AdminTableBodyRowItem>
							<AdminTableBodyRowItem>{order.id}</AdminTableBodyRowItem>
							<AdminTableBodyRowItem>{format(new Date(order.createdAt), 'PPpp')}</AdminTableBodyRowItem>
							<AdminTableBodyRowItem>{format(new Date(order.updatedAt), 'PPpp')}</AdminTableBodyRowItem>
							<AdminTableBodyRowItem>
								<Button>Edit</Button>
							</AdminTableBodyRowItem>
						</AdminTableBodyRow>
					))}
				</AdminTableBody>
			</AdminTable>
		</>
	)
}
