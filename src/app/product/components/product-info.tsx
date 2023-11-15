"use client"

import { ProductWithTotalPrice } from "@/helpers/product";
import {priceFormatter} from "@/helpers/formatter"
import { ArrowDownIcon, ArrowLeft, ArrowRight, TruckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductInfoPros {
  product: Pick<
    ProductWithTotalPrice,
    "basePrice"
    | "description"
    | "discountPercentage"
    | "totalPrice"
    | "name"
  >
}


export function ProductInfo({product:{basePrice, description, discountPercentage, totalPrice, name}}: ProductInfoPros ) {
  const [quantity, setQuantity] = useState(1)

  function handleDecreaseQuantityClick() {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1))
  }

  function handleIncreaseQuantityClick() {
    setQuantity((prev) => (prev + 1))
  }
  
  return (
    <div className="flex flex-col px-5" >
      <h2 className="text-lg" > {name} </h2>
      
      <div className="flex items-center gap-2" >
        <h1 className="text-xl font-bold" >{priceFormatter.format(totalPrice)}</h1>
        {discountPercentage > 0 && (
          <Badge className="px-2 py-[2px]">
            <ArrowDownIcon size={14}/>
            {discountPercentage}% 
          </Badge>
        )}
      </div>

      { discountPercentage > 0 && (
        <p className="text-sm opacity-60 line-through" >{priceFormatter.format(Number(basePrice))}</p>
      )}

      <div className="flex items-center gap-2 mt-5">
        <Button size="icon" variant="outline" onClick={handleDecreaseQuantityClick}>
          <ArrowLeft size={16} />
        </Button>

        <span> {quantity} </span>

        <Button size="icon" variant="outline" onClick={handleIncreaseQuantityClick}>
          <ArrowRight size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3" >
        <h3 className="font-bold text-sm">Descrição</h3>

        <p className="text-justify text-sm opacity-60" >{description}</p>
      </div>
      
      <Button className="mt-8 font-bold uppercase" >
        ADICIONAR AO CARRINHO
      </Button>

      <div className="flex items-center justify-between px-6 mt-5 bg-accent rounded-lg">
        <div className="flex items-center gap-3 " >
          <TruckIcon/>

          <div className="flex flex-col">
            <p className="text-sm">Entrega via <span className="font-bold" > FSPacket® </span></p>
            <p className="text-xs text-[#8162FF]">
              Envio para <span className="font-bold" > todo Brasil </span>
            </p>
          </div>
        </div>

        <div className="text-xs font-bold" >Frete Grátis</div>
      </div>
    </div>
  )
}