import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react"
import { CartContext } from "@/contexts/cart";

export function Cart() {
  const { products } = useContext(CartContext)


  return (
    <div>
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 text-base uppercase py-[0.375rem]" 
        variant="outline" 
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      {/* RENDERIZAR OS PRODUTOS */}
      {products.map((product) => (
        <h1 key={product.id}> {product.name} </h1>
      ))}
    </div>
  )
}