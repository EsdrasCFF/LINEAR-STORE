import Image from "next/image";
import { Categories } from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import { ProductList } from "./components/product-list";
import { SectionTitle } from "@/components/ui/section-title";
import { PromoBanner } from "./components/promo-banner";

export default async function Home() {

  const offers = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });
  
  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards"
      }
    }
  })

  return (
    <div>
      <PromoBanner
        src="/banner-home-01.png"
        alt="Até 55% de desconto"
      />
      
      
      <div className="mt-8 px-5" >
        <Categories/>
      </div>

      <div className="mt-8 mb-8" >
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={offers} />
      </div>

      <PromoBanner
        src="/banner-home-02.png"
        alt="Até 55% de desconto em mouses"
      />

      <div className="mt-8 mb-8" >
        <SectionTitle className="font-bold uppercase pl-5 mb-3 " >Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>
    </div>  
  )
}
