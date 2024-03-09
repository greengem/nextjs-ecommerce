interface TableProps {
  headers: string[];
  data: { key: string | number; data: any[] }[];
}

export default function Table({ headers, data }: TableProps) {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-2">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.key}>
            {row.data.map((cell, cellIndex) => (
              <td key={cellIndex} className="border px-4 py-2">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
