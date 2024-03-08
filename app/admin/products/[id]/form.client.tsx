'use client'
import { handleCreateNewProduct } from '@/server-actions/ProductActions';
import { SubmitButton } from '@/ui/Generic/Button';
import { useFormState } from 'react-dom'
import Input from '@/ui/Generic/Input';
import Select from '@/ui/Generic/Select';
import Textarea from '@/ui/Generic/Textarea';
import { Product, Tag, Category } from '@/types/ProductTypes';

interface AdminNewProductFormProps {
    categories: Category[];
    tags: Tag[];
    existingProduct: Product | null;
}

const initialState = {
    message: '',
    success: false,
}

export default function AdminNewProductForm({ 
    categories, tags, existingProduct
} : AdminNewProductFormProps ) {

    const [state, formAction] = useFormState(handleCreateNewProduct, initialState)

    const categoryList = categories.map((category) =>
        <option key={category.id} value={category.slug}>{category.name}</option>
    );
    const tagList = tags.map((tag) =>
        <option key={tag.id} value={tag.slug}>{tag.name}</option>
    );

    return (
        <form action={formAction} className='max-w-lg mx-auto'>
            <Input name='name' label='Name' required defaultValue={existingProduct?.name} />
            <Input name='slug' label='Slug' pattern='^[a-z0-9]+(-[a-z0-9]+)*$' title='Slug can only contain lowercase letters, numbers, and hyphens. It must not start or end with a hyphen.' required defaultValue={existingProduct?.slug} />
            <Input name='price' label='Price' type='number' step='0.01' required defaultValue={existingProduct?.price} />
            <Textarea name='description' label='Description' required defaultValue={existingProduct?.description} />
            <Select name='category' label='Category' multiple required defaultValue={existingProduct?.categories.map(category => category.slug)}>{categoryList}</Select>
            <Select name='tags' label='Tags' multiple defaultValue={existingProduct?.tags.map(tag => tag.slug)}>{tagList}</Select>
            {existingProduct && <input type="hidden" name="id" value={existingProduct.id} />}
            
            <p className='text-red-500'>{state?.message}</p>
            <SubmitButton>Submit</SubmitButton>
        </form>
    )
}
