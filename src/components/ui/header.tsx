"use client"

import { HomeIcon, ListOrderedIcon, LogInIcon, LogOutIcon, MenuIcon, PackageSearchIcon, PercentIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "./separator";
import Link from "next/link";
import { Cart } from "./cart";

export function Header() {

  const { status, data } = useSession();

  async function handleLoginClick() {
    await signIn();
  }

  async function handleLogoutClick () {
    await signOut();
  }

  return (
    <Card className="flex justify-between items-center p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild >
          <Button size="icon" variant="outline" >
            <MenuIcon/>
          </Button> 
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold" >
            Menu
          </SheetHeader>

          { status === "authenticated" && data?.user && (
            <div className="flex flex-col" >
              <div className="flex items-center gap-2 py-4" >
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>

                  {data.user.image && 
                    <AvatarImage src={data.user.image} />  
                  }
                </Avatar>
                <div className="flex flex-col" >
                  <p className="font-medium" > {data.user.name} </p>
                  <p className="text-sm opacity-75" >Boas Compras!</p>
                </div>
              </div>

              <Separator/>
            </div>  
          )}

          <div className="mt-4 flex flex-col gap-2">

            {status === "unauthenticated" && (
              <Button onClick={handleLoginClick} variant="outline" className="w-full justify-start gap-2" >
                <LogOutIcon size={16} />
                Fazer Login
              </Button>
            )}

            <SheetClose asChild>
              <Link href="/" >
                <Button variant="outline" className="w-full justify-start gap-2" >
                  <HomeIcon size={16} />
                  Início
                </Button>
              </Link>
            </SheetClose>
            
            <SheetClose asChild>
              <Link href="/orders" >
                <Button  variant="outline" className="w-full justify-start gap-2" >
                  <PackageSearchIcon size={16} />
                  Meus Pedidos
                </Button>
              </Link>
            </SheetClose>
            
            <SheetClose asChild >
              <Link href="/offers" >
                <Button  variant="outline" className="w-full justify-start gap-2" >
                  <PercentIcon size={16} />
                  Ofertas
                </Button>
              </Link>
            </SheetClose>


            <SheetClose asChild>
              <Link href="/catalog" >
                <Button  variant="outline" className="w-full justify-start gap-2" >
                  <ListOrderedIcon size={16} />
                  Catálogo
                </Button>
              </Link>
            </SheetClose>
            
            
            {status === "authenticated" && (
              <Button onClick={handleLogoutClick} variant="outline" className="w-full justify-start gap-2" >
                <LogOutIcon size={16} />
                Fazer Logout
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
      
      <Link href="/" >
        <h1 className="text-lg font-semibold" > 
          <span className="text-primary" > Linear </span> Store
        </h1>
      </Link>

      
      <Sheet>
        <SheetTrigger asChild >
          <Button size="icon" variant="outline" > 
            <ShoppingCartIcon />
          </Button>
        </SheetTrigger>

        <SheetContent className="w-[350px]" >
          <Cart/>
        </SheetContent>
      </Sheet>
    </Card>
  )
}