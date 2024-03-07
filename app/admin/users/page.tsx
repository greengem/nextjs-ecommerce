import Image from 'next/image';
import PageHeading from '@/ui/Heading/PageHeading';
import { 
	AdminTable, 
	AdminTableHeader, 
	AdminTableHeaderItem, 
	AdminTableBody, 
	AdminTableBodyRow, 
	AdminTableBodyRowItem 
} from '@/ui/Admin/Table';
import Button from '@/ui/Button';

export default async function AdminUsersPage() {
	return (
		<>
			<PageHeading title='Users' />
			
			<AdminTable>
				<AdminTableHeader>
					<AdminTableHeaderItem>Select</AdminTableHeaderItem>
					<AdminTableHeaderItem>Image</AdminTableHeaderItem>
					<AdminTableHeaderItem>Name</AdminTableHeaderItem>
					<AdminTableHeaderItem>Email</AdminTableHeaderItem>
					<AdminTableHeaderItem>Actions</AdminTableHeaderItem>
				</AdminTableHeader>
				<AdminTableBody>
					Todo
					{/* {users.map((user) => (
						<AdminTableBodyRow key={user.id}>
							<AdminTableBodyRowItem><input type='checkbox' /></AdminTableBodyRowItem>
							<AdminTableBodyRowItem>
								<>
									{user.image ? (
										<Image 
											src={user.image} 
											alt={user.name || 'User Image'}
											width={32} height={32}
											className='mb-1 rounded-full'
										/>
									) : (
										<Image 
											src="https://loremflickr.com/60/60" 
											alt='placeholder' 
											width={32} height={32}
											className='mb-1 rounded-full'
										/>
									)}
								</>
							</AdminTableBodyRowItem>
							<AdminTableBodyRowItem>{user.name}</AdminTableBodyRowItem>
							<AdminTableBodyRowItem>{user.email}</AdminTableBodyRowItem>
							<AdminTableBodyRowItem>
								<Button>Edit</Button>
							</AdminTableBodyRowItem>
						</AdminTableBodyRow>
					))} */}
				</AdminTableBody>
			</AdminTable>
		</>
	)
}
