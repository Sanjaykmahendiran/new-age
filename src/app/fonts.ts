// fonts.ts
import { Quicksand } from 'next/font/google';
import { Roboto } from "next/font/google";

export const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-quicksand',
  display: 'swap',
});


export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
