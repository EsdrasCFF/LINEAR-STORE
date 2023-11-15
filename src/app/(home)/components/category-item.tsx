import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICON } from "@/constants/category-icon";
import { Category } from "@prisma/client";

interface CategoryItemProps {
  category: Category
}

export function CategoryItem({category}: CategoryItemProps) {

  return (
    <Badge variant="outline" className="flex flex-center justify-center gap-2 py-3">
      {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
      <span className="text-xs font-bold" >{category.name}</span>
    </Badge>
  )
}