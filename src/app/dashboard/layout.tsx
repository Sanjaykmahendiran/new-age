import "@/app/globals.css";
import { RootLayoutProps } from "@/app/types";
import { quicksand } from "@/app/fonts";
import UserLayout from "@/components/layouts/user-layout";


export const metadata = {
  title: "New Age",
  description: "New Age",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="bg-gray-100">
      <body className={`${quicksand.className} antialiased`}>
        <UserLayout>{children}</UserLayout>
      </body>
    </html>
  );
}

