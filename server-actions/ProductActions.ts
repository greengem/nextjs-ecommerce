'use server';
import { checkRole } from "@/utils/roles";
import { z } from 'zod'
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache'
import { redirect } from "next/navigation";

export async function handleCreateNewProduct(
  prevState: {
    message: any;
  },
  formData: FormData,
) {

  if (!checkRole("admin")) {
    throw new Error("Unauthorized");
  }

  // Validate form data
  const schema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    price: z.number().min(1),
    description: z.string().min(1),
    category: z.array(z.string()),
    tags: z.array(z.string()),
    inventory: z.number(),
  });
  
  // Parse form data
  const rawFormData = {
    name: formData.get('name'),
    slug: formData.get('slug'),
    price: Number(formData.get('price')),
    description: formData.get('description'),
    category: formData.getAll('category'),
    tags: formData.getAll('tags'),
    inventory: Number(formData.get('inventory')),
  }
  const validatedData = schema.safeParse(rawFormData);

  if (!validatedData.success) {
    return { message: "Failed to validate product data" };
  }

  const data = validatedData.data;

  await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      price: data.price,
      description: data.description,
      categories: {
        connect: data.category.map((category: string) => ({ slug: category }))
      },
      tags: {
        connect: data.tags.map((tag: string) => ({ slug: tag }))
      },
      inventory: {
        create: {
          quantity: data.inventory
        }
      }
    }
  });

  revalidatePath('/admin/products');
  revalidatePath('/products');
  redirect('/admin/products');
}


export async function handleDeleteProduct(productId: string) {

  if (!checkRole("admin")) {
    throw new Error("Unauthorized");
  }

  // Delete associated inventory
  await prisma.inventory.deleteMany({
    where: {
      productId: productId
    }
  });

  // Delete product
  await prisma.product.delete({
    where: {
      id: productId
    }
  });

  revalidatePath('/admin/products');
  revalidatePath('/products');
  redirect('/admin/products');
}
