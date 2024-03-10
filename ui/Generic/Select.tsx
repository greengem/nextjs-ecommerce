import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    id?: string;
    value?: string | string[];
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
    children?: React.ReactNode;
}

export default function Select({ label, id, value, onChange, required, children, ...props }: SelectProps) {
    return (
        <div className='mb-4'>
            <label htmlFor={id} className='block text-gray-600 font-semibold'>{label}</label>
            <select multiple={Array.isArray(value)} name={id} id={id} value={value} onChange={onChange} required={required} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" {...props}>
                {children}
            </select>
        </div>
    )
}