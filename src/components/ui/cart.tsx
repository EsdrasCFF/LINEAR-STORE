import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext, useMemo } from "react"
import { CartContext } from "@/contexts/cart";
import { CartItem } from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { priceFormatter } from "@/helpers/formatter";

export function Cart() {
  const { products, subTotal, total, totalDiscount } = useContext(CartContext);

  return (
    <div className="flex flex-col gap-8" >
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 text-base uppercase py-[0.375rem]" 
        variant="outline" 
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

    
      <div className="flex flex-col gap-5">
        { products.length > 0 ? (
          products.map((product) => (
            <CartItem key={product.id} product={computeProductTotalPrice(product as any) as any} />
          ))
        ) : (
          <p className="text-sm font-semibold" >Carrinho vazio! Vamos fazer compras?</p>
        )}  
      </div>
      
      <div className="flex flex-col gap-2" >
        <Separator/>

        <div className="flex items-center justify-between">
          <p className="text-xs" >Subtotal</p>
          <p className="text-xs">{priceFormatter.format(subTotal)}</p>
        </div>

        <Separator/>

        <div className="flex items-center justify-between">
          <p className="text-xs" >Entrega</p>
          <p className="text-xs uppercase">grátis</p>
        </div>

        <Separator/>

        <div className="flex items-center justify-between">
          <p className="text-xs" >Descontos</p>
          <p className="text-xs">-{priceFormatter.format(totalDiscount)}</p>
        </div>

        <Separator/>

        <div className="flex items-center justify-between">
          <p className="text-sm font-bold" >Total</p>
          <p className="text-sm font-bold">{priceFormatter.format(total)}</p>
        </div>
      </div>
    </div>
  )
}