"use client"

import { ProductWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useEffect, useMemo, useState} from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  total: number;
  subTotal: number;
  totalDiscount: number;
  addProductToCart(product: CartProduct): void,
  decreaseProductQuantity(productId: string): void,
  increaseProductQuantity(productId: string): void,
  removeProductFromCart(productId: string): void,
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  total: 0,
  subTotal: 0,
  totalDiscount: 0,
  addProductToCart() {},
  decreaseProductQuantity() {},
  increaseProductQuantity() {},
  removeProductFromCart() {},
})

export function CartProvider({children}: {children: ReactNode}) {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subTotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + (Number(product.basePrice) * product.quantity)
    }, 0)
  }, [products])

  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + (product.totalPrice * product.quantity)
    }, 0)
  }, [products])

  const totalDiscount = subTotal - total;

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

  function decreaseProductQuantity(productId: string) {
    setProducts((prev) => 
      prev.map((cartProduct) => {
        if(cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1
          }
        }

        return cartProduct;
      }).filter((carrProduct) => carrProduct.quantity > 0),
    )
  }

  function increaseProductQuantity(productId: string) {
    setProducts((prev) => 
      prev.map((cartProduct) => {
        if(cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1
          }
        }

        return cartProduct;
      }).filter((carrProduct) => carrProduct.quantity > 0),
    )
  }  

  function removeProductFromCart(productId: string) {
    setProducts((prev) => 
      prev.filter((cartProduct) => cartProduct.id !== productId)
    )
  }

  useEffect(() => {
    setProducts(
      JSON.parse(localStorage.getItem("@linear-store/cart-products") || "[]"),
    );
  }, [])

  useEffect(() => {
    localStorage.setItem("@linear-store/cart-products", JSON.stringify(products))
  }, [products])

  return (
    <CartContext.Provider 
      value={{
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        total,
        subTotal,
        totalDiscount,
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