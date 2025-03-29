import getUsers from "@/actions/getUsers";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import getPlans from "@/actions/getPlans";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDateTime, formatPriceInDollar } from "@/lib/helper";

const AdminPanel = async () => {
  const users = await getUsers();
  const investmentPlans = await getPlans();

  if (users.length === 0) {
    return (
      <section>
        <h1 className="text-xl md:text-2xl font-semibold leading-none tracking-tight mb-3">
          Registered Users
        </h1>
        <Card>
          <div className="p-12">
            <p className="text-center">No users found.</p>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-5">
      <h1 className="text-xl md:text-2xl font-semibold leading-none tracking-tight mb-3">
        Welcome Admin
      </h1>
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
              {users?.map((user: any, index: number) => (
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

      <Card>
        <div className="p-12 w-full ">
          <div className="flex items-center justify-between mb-4">
            <div className="mb-4">
              <h1 className="text-base md:text-lg font-semibold leading-none tracking-tight">
                Investment Plans
              </h1>
              <p>Investment plans are available for all users.</p>
            </div>
            <Link href={"/admin/investment-plan"}>
              <Button>Create Plan</Button>
            </Link>
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto mt-10">
              {investmentPlans.length === 0 && (
                <div className="col-span-3">
                  <p className="text-center">No Investments Found.</p>
                </div>
              )}
              {/* List of investments */}
              {investmentPlans.map((investment: any) => (
                <Card
                  key={investment.name}
                  className="mb-4 p-3 py-4 flex flex-col gap-5"
                >
                  <CardTitle className="flex flex-col justify-center items-center gap-1 tracking-wide">
                    <h1 className="text-green text-sm md:text-lg">
                      {investment.interestRate}% ROI
                    </h1>
                    <div className="flex justify-center items-center gap-2">
                      <h2 className="text-green text-xl md:text-2xl font-semibold leading-none tracking-tight text-center">
                        {investment.name} Investment
                      </h2>
                    </div>
                    <hr className="w-full mt-5" />
                  </CardTitle>

                  <CardContent className="flex flex-col gap-5 px-3 py-0">
                    <div>
                      <span className="flex items-center gap-2">
                        {" "}
                        <Check className="text-green w-5 h-5" />
                        Minimum amount:{" "}
                        {formatPriceInDollar(investment.minAmount)}
                      </span>
                      <span className="flex items-center gap-2">
                        {" "}
                        <Check className="text-green w-5 h-5" />
                        Maximum amount:{" "}
                        {formatPriceInDollar(investment.maxAmount || 0)}
                      </span>
                      <span className="flex items-center gap-2">
                        {" "}
                        <Check className="text-green w-5 h-5" />
                        {investment.interestRate}% ROI
                      </span>
                      <span className="flex items-center gap-2">
                        {" "}
                        <Check className="text-green w-5 h-5" />
                        Charges Amount: {formatPriceInDollar(0)}
                      </span>
                      <span className="flex items-center gap-2">
                        {" "}
                        <Check className="text-green w-5 h-5" />
                        Duration:{" "}
                        <span className="lowercase">
                          {investment.durationValueFrom} to{" "}
                          {investment.durationValueTo} {investment.durationType}
                        </span>
                      </span>
                    </div>
                    <div className="border border-secondary p-4 flex items-center justify-center">
                      {`${formatPriceInDollar(investment.minAmount)} - ${formatPriceInDollar(investment.maxAmount || 0)}`}
                    </div>

                    <Link
                      href={`/admin/investment-plan/${investment.id}`}
                      className="w-full"
                    >
                      <Button className="w-full">Manage Plan</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default AdminPanel;
