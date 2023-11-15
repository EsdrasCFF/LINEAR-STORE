"use client"

import { ProductWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useState} from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  addProductToCart(product: CartProduct): void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  addProductToCart() {}
})

export function CartProvider({children}: {children: ReactNode}) {
  const [products, setProducts] = useState<CartProduct[]>([])

  function addProductToCart (product: CartProduct) {
    //se o produto já estiver no carinho aumente sua quantidade
    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if(productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }

          return cartProduct;
        }),
      );

      return;
    }

    setProducts((prev) => [...prev, product])
  }

  return (
    <CartContext.Provider 
      value={{
        addProductToCart,
        products,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        cartTotalPrice: 0
      }}
    >
      {children}
    </CartContext.Provider>
  )
}