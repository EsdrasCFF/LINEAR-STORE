import { Accordion, AccordionTrigger, AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card"
import { dateFormatter } from "@/helpers/formatter";
import { Order, Prisma } from "@prisma/client"
import { OrderProductItem } from "./order-product-item";

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


  return(
    <div>
      <Card className="px-5" >
        <Accordion type="single" className="w-full" collapsible >
          <AccordionItem value={order.id} >
            <AccordionTrigger>
              <div className="flex flex-col gap-1 text-left" >
                Pedido com {order.orderProducts.length} produtos(s)
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between" >
                  <div className="font-bold">
                    <p>Status</p>
                    <p className="text-[#8162FF]">{order.status}</p>
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