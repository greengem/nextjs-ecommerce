'use server';

import { z } from 'zod'
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache'

export async function handleCreateNewProduct(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    slug: formData.get('slug'),
    status: formData.get('price'),
    description: formData.get('description'),
    category: formData.get('category'),
    tags: formData.get('tags'),
    inventory: formData.get('inventory'),
  }

  try {
    await prisma.product.create({
      data: {
        name: rawFormData.name,
        slug: rawFormData.slug,
        price: rawFormData.price,
        description: rawFormData.description,
        category: {
          connect: {
            slug: rawFormData.category
          }
        },
        tags: {
          connect: rawFormData.tags.map((tag: string) => ({ slug: tag }))
        },
        inventory: rawFormData.inventory
      }
    });
    revalidatePath('/admin/products');
    return { success: true, message: "Product Created!"};
  } catch (e) {
    console.error(e);
    return { success: false, message: "Failed to create product" };
  }
}
