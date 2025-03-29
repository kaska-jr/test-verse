"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import ClientOnly from "@/components/ClientOnly";

export function User({ currentUser }: { currentUser: any }) {
  // let session = await auth();
  // let user = session?.user;

  const { name, image, email } = currentUser;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src={image ?? "/placeholder-user.png"}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
            <p className="font-bold">{name ?? ""}</p>
            <p>{email ?? ""}</p>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <ClientOnly>
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  await signOut({ callbackUrl: "/login", redirect: true });
                }}
              >
                <button type="submit">Sign Out</button>
              </form>
            </ClientOnly>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
