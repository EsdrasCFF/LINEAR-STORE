import { Accordion, AccordionTrigger, AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card"
import { dateAndHourFormatter, dateFormatter, priceFormatter } from "@/helpers/formatter";
import { Order, Prisma } from "@prisma/client"
import { OrderProductItem } from "./order-product-item";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { computeProductTotalPrice } from "@/helpers/product";
import { getOrderStatus } from "@/helpers/status";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true
        }
      },
    }
  }>
}

export function OrderItem({order}: OrderItemProps) {
  const subTotal = useMemo(()=> {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc +  Number(orderProduct.product.basePrice) * orderProduct.quantity
      );
    }, 0);
  }, [order.orderProducts])

  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      const productWithTotalPrice = computeProductTotalPrice(orderProduct.product);

      return acc + productWithTotalPrice.totalPrice * orderProduct.quantity;
    }, 0)
  }, [order.orderProducts])

  const totalDiscount = subTotal - total;

  return(
    <div>
      <Card className="px-5" >
        <Accordion type="single" className="w-full" collapsible >
          <AccordionItem value={order.id} >
            <AccordionTrigger>
              <div className="flex flex-col gap-1 text-left" >
                <p className="uppercase font-bold" >
                  Pedido com {order.orderProducts.length} produtos(s)
                </p>
                <span className="text-sm opacity-60" >
                  Feito em {dateAndHourFormatter.format(order.createdAt)}
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between" >
                  <div className="font-bold">
                    <p>Status</p>
                    <p className="text-[#8162FF]">{getOrderStatus(order.status)}</p>
                  </div>

                  <div className="flex flex-col">
                    <p className="font-bold" >Data</p>
                    <p className="opacity-60" >{dateFormatter.format(order.createdAt)}</p>
                  </div>

                  <div className="flex flex-col">
                    <p className="font-bold" >Pagamento</p>
                    <p className="opacity-60" >Cartão</p>
                  </div>
                </div>

                <div>
                  {order.orderProducts.map((orderProduct) => (
                    <OrderProductItem key={orderProduct.id} orderProduct={orderProduct} />
                  ))}
                  
                  <div className="flex w-full flex-col gap-1 text-xs" >
                    <Separator className="py" />

                    <div className="flex w-full justify-between py-3" >
                      <p>Subtotal</p>
                      <p>{priceFormatter.format(subTotal)}</p>
                    </div>

                    <Separator/>
                    
                    <div className="flex w-full justify-between py-3" >
                      <p>Entrega</p>
                      <p>GRÁTIS</p>
                    </div>

                    <Separator/>
                    
                    <div className="flex w-full justify-between py-3" >
                      <p>Desconto</p>
                      <p>-{ priceFormatter.format(totalDiscount)}</p>
                    </div>
                    
                    <Separator/>
                    
                    <div className="flex w-full justify-between py-3" >
                      <p>Total</p>
                      <p>{priceFormatter.format(total)}</p>
                    </div>
                  </div>
                </div>

              </div>

              <div>
                
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  )
}