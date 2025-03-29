import { ToastContainer } from "react-toastify";
import "../styles/globals.css";

export const metadata = {
  title: "Tesla verse",
  description:
    "A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ToastContainer />
      <body className="flex min-h-screen w-full flex-col">{children}</body>
    </html>
  );
}
