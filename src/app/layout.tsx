import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import SideNavigation from "@/components/sidenavigation";

export const metadata: Metadata = {
  title: "Whatbytes",
  description: "Ui for whatbytes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        <main className="flex flex-grow">
          <SideNavigation />
          {children}
        </main>
        {/* {children} */}
      </body>
    </html>
  );
}
