"use server"

import { CartProduct } from "@/contexts/cart";
import { prismaClient } from "@/lib/prisma";

export async function createOrder(cartProducts: CartProduct[], userId: string) {
  
  const order = await prismaClient.order.create({
    data: {
      userId,
      status: "WAITING_FOR_PAYMENT",
      orderProducts: {
        createMany: {
          data: cartProducts.map( (product) => ({
            basePrice: product.basePrice,
            discountPercentage: product.discountPercentage,
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    },
  });

  return order;
};