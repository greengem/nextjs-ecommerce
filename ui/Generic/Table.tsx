// TableHeader.tsx
interface TableHeaderProps {
  headers: string[];
}

export const TableHeader = ({ headers }: TableHeaderProps) => (
  <thead>
    <tr>
      {headers.map((header, index) => (
        <th key={index} className="px-4 py-2">{header}</th>
      ))}
    </tr>
  </thead>
);

// TableRow.tsx
interface TableRowProps {
  children: React.ReactNode;
  key: string | number;
}

export const TableRow = ({ children, key }: TableRowProps) => (
  <tr key={key}>
    {children}
  </tr>
);

// TableCell.tsx
interface TableCellProps {
  children: React.ReactNode;
}

export const TableCell = ({ children }: TableCellProps) => (
  <td className="border px-4 py-2">{children}</td>
);

// Table.tsx
interface TableProps {
  children: React.ReactNode;
}

export const Table = ({ children }: TableProps) => (
  <table className="table-auto w-full">
    {children}
  </table>
);
