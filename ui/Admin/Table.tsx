export function AdminTable({ children }: { children: React.ReactNode }) {
    return (
        <table className="min-w-full table-auto border-collapse border border-gray-200">
            {children}
        </table>
    );
}

export function AdminTableHeader({ children }: { children: React.ReactNode }) {
    return (
        <thead className="bg-gray-100">
            <tr className='border-b border-gray-200 text-left text-sm font-semibold text-gray-600'>
                {children}
            </tr>
        </thead>
    );
}

export function AdminTableHeaderItem({ children }: { children: React.ReactNode }) {
    return (
        <th className='px-4 py-2'>
            {children}
        </th>
    );
}

export function AdminTableBody({ children }: { children: React.ReactNode }) {
    return (
        <tbody>
            {children}
        </tbody>
    );
}

export function AdminTableBodyRow({ children }: { children: React.ReactNode }) {
    return (
        <tr className='border-b border-gray-200 text-sm text-gray-700'>
            {children}
        </tr>
    );
}

export function AdminTableBodyRowItem({ children }: { children: React.ReactNode }) {
    return (
        <td className='px-4 py-2'>
            {children}
        </td>
    );
}
