import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext, useMemo } from "react"
import { CartContext } from "@/contexts/cart";
import { CartItem } from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { priceFormatter } from "@/helpers/formatter";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { createOrder } from "@/actions/order";

export function Cart() {
  const { data } = useSession();

  const { products, subTotal, total, totalDiscount } = useContext(CartContext);

  async function handleFinishPurchaseClick() {
    if(!data?.user) {
      // TODO: redirecionar para o login
    }
    
    const order = await createOrder(products, (data?.user as any).id);
  
    const checkout = await createCheckout(products, order.id);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    })

  }

  return (
    <div className="flex flex-col gap-8 h-full" >
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 text-base uppercase py-[0.375rem]" 
        variant="outline" 
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>


      <div className="flex flex-col gap-5 h-full overflow-hidden">
        <ScrollArea>
          <div className="flex h-full flex-col gap-4" >
            { products.length > 0 ? (
              products.map((product) => (
                <CartItem 
                  key={product.id} 
                  product={computeProductTotalPrice(product as any) as any}
                />
              ))
            ) : (
              <p className="text-sm font-semibold" >Carrinho vazio! Vamos fazer compras?</p>
            )}  
          </div>
        </ScrollArea>
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

        <Button 
          className="uppercase font-bold mt-7" 
          onClick={handleFinishPurchaseClick} 
          disabled={products.length == 0}
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  )
}