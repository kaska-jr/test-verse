import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getUsers() {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser && currentUser.role !== "ADMIN") {
      throw new Error("Unauthorized, only admins can view users");
    }
    const users = await prisma.user.findMany({
      where: {
        role: "USER",
      },
    });
    const serializedUsers = users.map((user: any) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }));

    return serializedUsers;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
