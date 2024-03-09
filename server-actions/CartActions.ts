'use server'
import { auth } from "@clerk/nextjs";
import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";

export async function handleAddToCart(productId: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  //await new Promise(resolve => setTimeout(resolve, 5000));

  // Check if cart exists for the user
  let cart = await prisma.cart.findFirst({
    where: {
      userId: userId,
    },
  });

  // If cart does not exist, create a new cart
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId: userId,
      },
    });
  }

  // Check if product already exists in the cart
  let cartItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId: productId,
    },
  });

  if (cartItem) {
    // If product exists in the cart, increase the quantity
    await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });
  } else {
    // If product does not exist in the cart, add a new item
    await prisma.cartItem.create({
      data: {
        quantity: 1,
        productId: productId,
        cartId: cart.id,
      },
    });
  }

  revalidatePath('/cart');
}

export async function handleRemoveFromCart(cartItemId: string) {
  const { userId } = auth();

  await prisma.cartItem.delete({
    where: {
      id: cartItemId,
    },
  });

  //await new Promise(resolve => setTimeout(resolve, 5000));


  revalidatePath('/cart');
}