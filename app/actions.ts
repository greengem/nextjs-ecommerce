'use server';

import { z } from 'zod'
import prisma from '@/db/prisma';
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache'

const ProductSchema = z.object({
	productName: z.string(),
	productSlug: z.string(),
	productDescription: z.string(),
	productPrice: z.number(),
	productCategory: z.string(),
	productTags: z.array(z.string()),
	productImage: z.instanceof(File).optional(),
});

export async function handleCreateNewProduct(formData: FormData) {
  const productName = formData.get('productName') as string;
  const productSlug = formData.get('productSlug') as string;
  const productDescription = formData.get('productDescription') as string;
  const productPrice = parseFloat(formData.get('productPrice') as string) || 0;
  const productCategory = formData.get('productCategory') as string;
  const productTags = formData.getAll('productTags') as string[];
  const productImage = formData.get('productImage') as File | string;

  const productData = {
    productName,
    productSlug,
    productDescription,
    productPrice,
    productCategory,
    productTags,
    productImage,
  };

  try {
    const validatedData = ProductSchema.parse(productData);
    
    console.log(validatedData);

    const product = await prisma.product.create({
      data: {
        name: validatedData.productName,
        slug: validatedData.productSlug,
        description: validatedData.productDescription,
        price: validatedData.productPrice,
        categories: {
          connect: { slug: validatedData.productCategory },
        },
        tags: {
          connect: validatedData.productTags.map(tagSlug => ({ slug: tagSlug })),
        },
      }
    });

    redirect("/admin/products");

  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function handleDeleteProduct(formData: FormData) {
  const productId = formData.get('productId') as string;

  if (!productId) {
    throw new Error("Product ID is required for deletion.");
  }
  
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    revalidatePath('/admin/products')

  } catch (error) {
    console.error(error);
    throw error;
  }
}