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
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${roboto.className} h-full antialiased bg-gray-50`}>
        <div className="min-h-screen bg-gray-50">
          <Suspense>{children}</Suspense>
        </div>
      </body>
    </html>
  );
}
