import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "../Sheet"
import { Button } from "../Generic/Button"
import prisma from "@/db/prisma"
import { auth } from "@clerk/nextjs"
import { IconShoppingBag } from "@tabler/icons-react"
import RemoveFromCartButton from "@/app/cart/_components/RemoveFromCartButton"
import Link from "next/link"
import { ButtonLink } from "../Generic/ButtonLink"

export default async function CartDrawer() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const cartItems = await prisma.cartItem.findMany({
    where: {
      cart: {
        userId: userId
      }
    },
    include: {
      product: true,
    },
  });

  return (
      <Sheet>
        <SheetTrigger asChild>
          <Button><IconShoppingBag size={18} /></Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-white">
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
          </SheetHeader>
          {cartItems.length > 0 ? (
            <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div className="flex justify-between">
                    <p>{item.product.name}</p>
                    <p>{item.quantity}</p>
                  </div>
                  <RemoveFromCartButton cartItemId={item.id} />
                </li>
              ))}
            </ul>
            <Link href="/checkout">Checkout</Link>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
          <SheetFooter className="bg-pink-200 absolute bottom-0 right-0 left-0 p-5">
              <ul>
                <li className="flex justify-between">
                  <p>Taxes</p>
                  <p>£0.00 GBP</p>
                </li>
                <li className="flex justify-between">
                  <p>Shipping</p>
                  <p>Calculated at Checkout</p>
                </li>
                <li className="flex justify-between">
                  <p>Total</p>
                  <p>£0.00 GBP</p>
                </li>
              </ul>
              <ButtonLink href="/checkout">Proceed to Checkout</ButtonLink>
          </SheetFooter>
        </SheetContent>
      </Sheet>
  )
}