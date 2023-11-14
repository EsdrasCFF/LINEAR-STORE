import { Badge } from "@/components/ui/badge";
import { ShapesIcon } from "lucide-react";
import { CategoryItem } from "./components/category-item";
import { prismaClient } from "@/lib/prisma";

export default async function CatalogPage() {
const categories = await prismaClient.category.findMany({});

  return (
    <div className="p-5 gap-8 flex flex-col" >
      <Badge className="w-fit gap-1 border-2 border-primary px-3 text-base uppercase py-[0.375rem]" variant="outline" >
        <ShapesIcon size={16} />
        Catálogo
      </Badge>

      <div className="grid grid-cols-2 gap-8" >
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}