import PageHeading from '@/ui/Heading/PageHeading';
import { handleEditProduct } from '@/app/actions/ProductActions';
import Button from '@/ui/Button';
import { getProduct } from '@/lib/FetchData';

export default async function AdminEditProductPage({ params }: { params: { slug: string } }) {
	const product = await getProduct(params.slug);
	
	return (
		<>
			<PageHeading title='Edit Product' />

			<form action={handleEditProduct} className='max-w-lg mx-auto'>
				<label htmlFor='productName' className='block text-gray-600 font-semibold'>Product Name</label>
				<input type='text' id='productName' name='productName' required className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" defaultValue={product?.name} />

				<label htmlFor='productSlug' className='block text-gray-600 font-semibold'>Slug</label>
				<input type='text' id='productSlug' name='productSlug' required className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" defaultValue={product?.slug} />

				<label htmlFor='productPrice' className='block text-gray-600 font-semibold'>Price</label>
				<input type='number' id='productPrice' name='productPrice' step='0.01' required className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" defaultValue={product?.price}  />

				<label htmlFor='productDescription' className='block text-gray-600 font-semibold'>Description</label>
				<textarea id='productDescription' name='productDescription' required className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" defaultValue={product?.description} />

				<label htmlFor='productImage' className='block text-gray-600 font-semibold'>Image</label>
				<input type='file' id='productImage' name='productImage' className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />

				<label htmlFor="productCategory" className='block text-gray-600 font-semibold'>Category</label>
				<select id="productCategory" name="productCategory">
					<option value="jewellery">Jewellery</option>
					<option value="accessories">Accessories</option>
				</select>

				<label htmlFor="productTags" className='block text-gray-600 font-semibold'>Tags</label>
				<select id="productTags" name="productTags" multiple>
					<option value="red">Red</option>
					<option value="bag">Bag</option>
					<option value="silver">Silver</option>
					<option value="necklace">Necklace</option>
				</select>

				<input type="hidden" name="productId" value={product?.id} />

				<Button type='submit'>Submit</Button>

			</form>
		</>
	)
}
