import { Category } from "@prisma/client"
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
}

export function CategoryItem({category}: CategoryItemProps) {
  return (
    <div className="flex flex-col" >
      <div className="rouded-tl-lg rouded-tr-lg flex h-[150px] w-full items-center justify-center bg-category-item-gradient" >
        <Image
          src={category.imageUrl}
          alt={category.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w[80%]"
          style={{
            objectFit:"cover"
          }}
        />
      </div>
      <div className="bg-accent py-3 rounded-br-lg rounded-bl-lg text-center"> 
        <p className="text-sm font-semibold" >{category.name}</p> 
      </div>
    </div>
  )
}