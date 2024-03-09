import { getOrders } from "@/lib/FetchData";
import PageHeading from '@/ui/Heading/PageHeading';
import { format } from 'date-fns';
import { 
	AdminTable, 
	AdminTableHeader, 
	AdminTableHeaderItem, 
	AdminTableBody, 
	AdminTableBodyRow, 
	AdminTableBodyRowItem 
} from '@/ui/Admin/Table';
import { Button } from '@/ui/Generic/Button';

export default async function AdminUsersPage() {
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
