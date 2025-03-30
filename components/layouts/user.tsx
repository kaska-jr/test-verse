"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import ClientOnly from "@/components/ClientOnly";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import Link from "next/link";
import { BsBoundingBox } from "react-icons/bs";

export function User() {
  const { user } = useGetCurrentUser() as any;
  const { name, image, email } = user;

  return (
    <>
      {user?.role === "ADMIN" && (
        <Link href={"/admin"}>
          <Button className="flex items-center gap-2">
            <BsBoundingBox /> <span>Admin Panel</span>
          </Button>
        </Link>
      )}
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
