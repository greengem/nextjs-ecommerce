import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    id?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
}

export default function Textarea({ label, id, value, onChange, required, ...props }: TextareaProps) {
    return (
        <div className='mb-4'>
            <label htmlFor={id} className='block text-gray-600 font-semibold'>{label}</label>
            <textarea name={id} id={id} value={value} onChange={onChange} required={required} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" {...props} />
        </div>
    )
}
