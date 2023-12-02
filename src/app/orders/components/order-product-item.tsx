import { priceFormatter } from "@/helpers/formatter";
import { computeProductTotalPrice } from "@/helpers/product";
import { OrderProduct, Prisma } from "@prisma/client";
import Image from 'next/image'

interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    }
  }>
}

export function OrderProductItem({orderProduct}:OrderProductItemProps) {
  const productWithTotalPrice = computeProductTotalPrice(orderProduct.product)

  return (
    <div className="flex flex-center gap-4" >
      <div className="flex h-[77px] w-[77px] items-center justify-center rounded-xl bg-accent" >
        <Image
          src={orderProduct.product.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
          alt={orderProduct.product.name}
        />
      </div>

      <div className="flex w-full flex-col gap-1" >
        <div className="flex w-fit rounded-md bg-accent px-3 py-1" >
          <p className="text-[10px]" >
            Vendido e entregue por <span className="font-bold" >Linear Store</span>
          </p>
        </div>

        <p className="text-xs" >{orderProduct.product.name}</p>

        <div className="flex w-full items-center justify-between gap-1" >
          <div className="flex items-center gap-1" >
            <p className="text-sm font-bold" >
              { priceFormatter.format(productWithTotalPrice.totalPrice) }
            </p>

            {productWithTotalPrice.discountPercentage > 0 && (
              <p className="opacity-60 line-through text-xs" >
                {priceFormatter.format(Number(productWithTotalPrice.basePrice))}
              </p>
            )}
          </div>

          <p className="text-xs opacity-60" > Qtde: {orderProduct.quantity} </p>
        </div>
      </div>
    </div>
  )
}