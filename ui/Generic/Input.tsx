import { ChangeEvent, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export default function Input({ label, id, value, onChange, type = 'text', ...props }: InputProps) {
    return (
        <div className='mb-4'>
            <label htmlFor={id} className='block text-gray-600 font-semibold'>{label}</label>
            <input name={id} id={id} value={value} onChange={onChange} type={type} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" {...props} />
        </div>
    )
}