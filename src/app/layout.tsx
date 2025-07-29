
import "@/app/globals.css";
import { RootLayoutProps } from "@/app/types";
import { Suspense } from "react";
import { roboto } from "@/app/fonts";

export const metadata = {
  title: "New Age",
  description: "New Age",
};


export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="bg-gray-100">
      <body className={`${roboto.className} antialiased`}>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
