import { priceFormatter } from '@/helpers/formatter';
import {ProductWithTotalPrice } from '@/helpers/product';
import Image from "next/image";
import { Badge } from './badge';
import { ArrowDownIcon } from 'lucide-react';

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

export function ProductItem({product}: ProductItemProps) {
  return (
    <div className=" flex max-w-[170px] flex-col gap-4" >
      <div className="relative flex h-[170px] w-[170px] items-center justify-center rounded-lg bg-accent" >
        <Image
          src={product.imageUrls[0]}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{
            objectFit: "contain",
          }}
          alt={product.name}
        />
        
        {product.discountPercentage > 0 && (
          <Badge className='absolute left-3 top-3 px-2 py-[2px]'>
            <ArrowDownIcon size={14} /> {product.discountPercentage}%
          </Badge>
        )}
      </div>
      


      <div className='flex flex-col gap-1' >
        <p className="overflow-hidden whitespace-nowrap text-sm text-ellipsis">
          {product.name}
        </p>

        <div className="flex items-center gap-2">
          {product.discountPercentage > 0 && (
            <>
              <span className='font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>{ priceFormatter.format(product.totalPrice)}</span>
              <span className='line-through opacity-50 overflow-hidden text-ellipsis whitespace-nowrap text-xs'>{priceFormatter.format(Number(product.basePrice))}</span>
            </>
          )}

          {product.discountPercentage === 0 && (
            <span className='font-semibold overflow-hidden whitespace-nowrap text-ellipsis' > {priceFormatter.format(Number(product.basePrice))} </span>
          )}
        </div>
      </div>
    </div>
  )
}