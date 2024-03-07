'use server';

import { z } from 'zod'
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache'

export async function handleCreateNewProduct(data: FormData) {
  console.log('server data', data);

  try {

    revalidatePath('/admin/products');
    return { success: true, message: "Product Created!"};
  } catch (e) {
    console.error(e);
    return { success: false, message: "Failed to create product" };
  }
}
