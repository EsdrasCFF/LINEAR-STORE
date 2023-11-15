import { CartContext, CartProduct } from "@/contexts/cart";
import { priceFormatter } from "@/helpers/formatter";
import Image from 'next/image'
import { Button } from "./button";
import { ArrowLeft, ArrowRight, TrashIcon } from "lucide-react";
import {useContext} from 'react'

interface CartItemProps {
  product: CartProduct;
}

export function CartItem({product}: CartItemProps) {
  const {decreaseProductQuantity, increaseProductQuantity} = useContext(CartContext)

  function handleDecreaseProductyQuantityClick() {
    decreaseProductQuantity(product.id)
  }

  function handleIncreaseProductyQuantityClick() {
    increaseProductQuantity(product.id)
  }

  return(
    <div className="flex items-center justify-between" >
      <div className="flex items-center gap-4" >
        <div className="flex items-center justify-center rounded-lg bg-accent h-[77px] w-[77px]" >
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            alt={product.name}
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>

        <div className="flex flex-col" >
          <p className="text-xs" >{product.name}</p>

          <div className="flex items-center gap-2" >
            <p className="text-sm font-bold">
              { priceFormatter.format(product.totalPrice)}
            </p>
            
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-60">
                {priceFormatter.format(Number(product.basePrice))}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" className="h-8 w-8" onClick={handleDecreaseProductyQuantityClick}>
              <ArrowLeft size={16} />
            </Button>

            <span className="text-xs" > {product.quantity} </span>

            <Button size="icon" variant="outline" className="h-8 w-8" onClick={handleIncreaseProductyQuantityClick}>
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>

      
      <Button variant="outline" >
        <TrashIcon size={16}/>
      </Button>
    </div>
  )
}