'use client'
import { handleCreateNewProduct } from '@/server-actions/ProductActions';
import { SubmitButton } from '@/ui/Generic/Button';
import { useFormState } from 'react-dom'

import Input from '@/ui/Generic/Input';
import Select from '@/ui/Generic/Select';
import Textarea from '@/ui/Generic/Textarea';

interface Category {
    id: string;
    slug: string;
    name: string;
}
  
interface Tag {
    id: string;
    slug: string;
    name: string;
}

interface AdminNewProductFormProps {
    categories: Category[];
    tags: Tag[];
}

const initialState = {
    message: '',
    success: false,
}

export default function AdminNewProductForm({ categories, tags} : AdminNewProductFormProps ) {
    const [state, formAction] = useFormState(handleCreateNewProduct, initialState)

    const categoryList = categories.map((category) =>
        <option key={category.id} value={category.slug}>{category.name}</option>
    );
    const tagList = tags.map((tag) =>
        <option key={tag.id} value={tag.slug}>{tag.name}</option>
    );

    return (
        <form action={formAction} className='max-w-lg mx-auto'>
            <Input name='name' label='Name' required />
            <Input name='slug' label='Slug' pattern='^[a-z0-9]+(-[a-z0-9]+)*$' title='Slug can only contain lowercase letters, numbers, and hyphens. It must not start or end with a hyphen.' required />
            <Input name='price' label='Price' type='number' step='0.01' required />
            <Textarea name='description' label='Description' required />
            <Select name='category' label='Category' multiple required>{categoryList}</Select>
            <Select name='tags' label='Tags' multiple>{tagList}</Select>
            <Input name='inventory' label='Inventory' type='number' required />

            <p className='text-red-500'>{state?.message}</p>
            <SubmitButton>Submit</SubmitButton>
        </form>
    )
}
