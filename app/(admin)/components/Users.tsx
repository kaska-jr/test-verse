"use client";
import { Card } from "@/components/ui/card";
import useGetAllUsers from "@/hooks/useGetAllUsers";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateTime, formatPriceInDollar } from "@/lib/helper";
import Link from "next/link";

const Users = () => {
  const { users } = useGetAllUsers() as any;
  const nonAdminUsers = (Array.isArray(users) ? users : []).filter(
    (user: any) => user.role !== "ADMIN"
  );

  return (
    <>
      {nonAdminUsers.length === 0 && (
        <Card>
          <div className="p-12">
            <p className="text-center">No users found.</p>
          </div>
        </Card>
      )}

      {nonAdminUsers.length > 0 && (
        <Card>
          <div className="p-12 w-full">
            <h1 className="mb-4 text-base md:text-lg font-semibold leading-none tracking-tight">
              Registered Users
            </h1>
            <table className="w-full table-auto text-sm text-left mb-8">
              <thead className="table-header">
                <tr className="font-large w-full text-nowrap text-primary">
                  <th className="!text-primary py-2 px-5">Action</th>
                  <th className="!text-primary py-2 pr-4 lg:pr-2 px-5">
                    Investors Name
                  </th>
                  <th className="!text-primary py-2 px-5">Email</th>
                  <th className="!text-primary py-2 px-5">Contact</th>
                  <th className="!text-primary py-2 px-5">Verified</th>
                  <th className="!text-primary py-2 px-5">Date Created</th>
                </tr>
              </thead>
              <tbody className=" text-nowrap merchants">
                {nonAdminUsers?.map((user: any, index: number) => (
                  <tr key={index} className={`"text-nowrap`}>
                    <td className="py-2 px-5 cursor-pointer">
                      <DropdownMenu>
                        <DropdownMenuTrigger>...</DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem className="flex items-center">
                            <Link
                              href={`/admin/manage/${user.id}`}
                              className="w-full h-full flex items-center"
                            >
                              Manage
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                    <td className="py-2 px-5">{user.name}</td>
                    <td className="py-2 px-5">{user.email}</td>
                    <td className="py-2 px-5 pr-8 lg:pr-2 capitalize">
                      {user.number}
                    </td>
                    <td className="py-2 px-5">
                      {user.emailVerified ? "Yes" : "No"}
                    </td>
                    <td className="py-2 px-5">
                      {formatDateTime(user.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  );
};

export default Users;
