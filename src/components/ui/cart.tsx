import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react"
import { CartContext } from "@/contexts/cart";
import { CartItem } from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";

export function Cart() {
  const { products } = useContext(CartContext)


  return (
    <div className="flex flex-col gap-8" >
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 text-base uppercase py-[0.375rem]" 
        variant="outline" 
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      {/* RENDERIZAR OS PRODUTOS */}
      <div className="flex flex-col gap-5">
        {products.map((product) => (
          <CartItem key={product.id} product={computeProductTotalPrice(product as any) as any} />
        ))}
      </div>
    </div>
  )
}