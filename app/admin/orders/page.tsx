import prisma from '@/db/prisma';
import { auth } from "@/auth";
import Image from 'next/image';
import PageHeading from '@/ui/Heading/PageHeading';
import { Order } from '@/types/OrderTypes';
import { format } from 'date-fns';

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
			
			<table className="min-w-full table-auto border-collapse border border-gray-200">
				<thead className="bg-gray-100">
					<tr className='border-b border-gray-200 text-left text-sm font-semibold text-gray-600'>
						<th className='px-4 py-2'>Select</th>
						<th className='px-4 py-2'>Order ID</th>
						<th className='px-4 py-2'>Created</th>
						<th className='px-4 py-2'>Updated</th>
						<th className='px-4 py-2'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order.id} className='border-b border-gray-200 text-sm text-gray-700'>
							<td className='px-4 py-2'><input type='checkbox' /></td>
							<td className='px-4 py-2'>{order.id}</td>
							<td className='px-4 py-2'>{format(new Date(order.createdAt), 'PPpp')}</td>
							<td className='px-4 py-2'>{format(new Date(order.updatedAt), 'PPpp')}</td>
							<td className='px-4 py-2'>
								<button>Edit</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
