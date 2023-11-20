import prisma from '@/db/prisma';
import { auth } from "@/auth";
import Image from 'next/image';
import PageHeading from '@/ui/Heading/PageHeading';
import { User } from '@/types/UserTypes';
import { 
	AdminTable, 
	AdminTableHeader, 
	AdminTableHeaderItem, 
	AdminTableBody, 
	AdminTableBodyRow, 
	AdminTableBodyRowItem 
} from '@/ui/Admin/Table';

async function getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
			email: true,
            image: true,
        }
    });
    return users;
}

export default async function AdminUsersPage() {
	const session = await auth();
	const users = await getUsers();
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
					{users.map((user) => (
						<AdminTableBodyRow key={user.id}>
							<AdminTableBodyRowItem><input type='checkbox' /></AdminTableBodyRowItem>
							<AdminTableBodyRowItem>
								<>
									{user.image ? (
										<Image 
											src={user.image} 
											alt={user.name || 'User Image'}
											width={32} height={32}
											className='mb-1'
										/>
									) : (
										<Image 
											src="https://loremflickr.com/60/60" 
											alt='placeholder' 
											width={32} height={32}
											className='mb-1'
										/>
									)}
								</>
							</AdminTableBodyRowItem>
							<AdminTableBodyRowItem>{user.name}</AdminTableBodyRowItem>
							<AdminTableBodyRowItem>{user.email}</AdminTableBodyRowItem>
							<AdminTableBodyRowItem>
								<button>Edit</button>
							</AdminTableBodyRowItem>
						</AdminTableBodyRow>
					))}
				</AdminTableBody>
			</AdminTable>
		</>
	)
}
