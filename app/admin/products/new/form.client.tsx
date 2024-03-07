'use client'
import { handleCreateNewProduct } from '@/app/actions/ProductActions';
import Button from '@/ui/Generic/Button';
import Input from '@/ui/Generic/Input';
import Select from '@/ui/Generic/Select';
import Textarea from '@/ui/Generic/Textarea';
import { toast } from 'sonner';

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

export default function AdminNewProductForm({ categories, tags} : AdminNewProductFormProps ) {

    // Create Category and Tag List
    const categoryList = categories.map((category) =>
        <option key={category.id} value={category.slug}>{category.name}</option>
    );
    const tagList = tags.map((tag) =>
        <option key={tag.id} value={tag.slug}>{tag.name}</option>
    );

	// Form Submit
	// const onSubmit = async (data) => {
    //     console.log('client data', data);
    //     const response = await handleCreateNewProduct(data);
    
    //     if (response.success) {
    //         toast.success(response.message);
    //     } else {
    //         toast.error(response.message);
    //     }
    // };

    return (
        <form action={handleCreateNewProduct} className='max-w-lg mx-auto'>
            <Input name='productName' id='productName' label='Name' required />
            <Input name='productSlug' id='productSlug' label='Slug' />
            <Input name='productPrice' id='productPrice' label='Price' />
            <Textarea name='productDescription' id='productDescription' label='Description' />
            <Select name='productCategory' id='productCategory' label='Category' required>{categoryList}</Select>
            <Select name='productTags' id='productTags' label='Tags' multiple>{tagList}</Select>
            <Input name='productInventory' id='productInventory' label='Inventory' />
            <Button type='submit'>Submit</Button>
        </form>
    )
}
