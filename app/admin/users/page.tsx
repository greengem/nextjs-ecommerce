import prisma from '@/db/prisma';
import { auth } from "@/auth";
import Image from 'next/image';
import PageHeading from '@/ui/Heading/PageHeading';
import { User } from '@/types/UserTypes';


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
			
			<table className="min-w-full table-auto border-collapse border border-gray-200">
				<thead className="bg-gray-100">
					<tr className='border-b border-gray-200 text-left text-sm font-semibold text-gray-600'>
						<th className='px-4 py-2'>Select</th>
						<th className='px-4 py-2'>Image</th>
						<th className='px-4 py-2'>Name</th>
						<th className='px-4 py-2'>Email</th>
						<th className='px-4 py-2'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id} className='border-b border-gray-200 text-sm text-gray-700'>
							<td className='px-4 py-2'><input type='checkbox' /></td>
							<td className='px-4 py-2'>
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
							</td>
							<td className='px-4 py-2'>{user.name}</td>
							<td className='px-4 py-2'>{user.email}</td>
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
