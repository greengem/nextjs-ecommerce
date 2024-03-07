'use client'
import { useForm } from 'react-hook-form';
import { handleCreateNewProduct } from '@/app/actions/ProductActions';
import Button from '@/ui/Button';
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
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-lg mx-auto'>
            <label htmlFor='productName' className='block text-gray-600 font-semibold'>Product Name</label>
            <input {...register('productName', { required: true })} id='productName' className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />

            <label htmlFor='productSlug' className='block text-gray-600 font-semibold'>Slug</label>
            <input {...register('productSlug', { required: true })} id='productSlug' className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />

            <label htmlFor='productPrice' className='block text-gray-600 font-semibold'>Price</label>
            <input {...register('productPrice', { required: true })} id='productPrice' className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />

            <label htmlFor='productDescription' className='block text-gray-600 font-semibold'>Description</label>
            <textarea {...register('productDescription', { required: true })} id='productDescription' className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />

            <label htmlFor="productCategory" className='block text-gray-600 font-semibold'>Category</label>
            <select {...register('productCategory', { required: true })} id="productCategory">
                {categoryList}
            </select>

            <label htmlFor="productTags" className='block text-gray-600 font-semibold'>Tags</label>
            <select {...register('productTags')} id="productTags" multiple>
                {tagList}
            </select>

            <label htmlFor='productInventory' className='block text-gray-600 font-semibold'>Inventory</label>
            <input {...register('productInventory', { required: true })} id='productInventory' className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />

            <Button type='submit'>Submit</Button>
        </form>
    )
}