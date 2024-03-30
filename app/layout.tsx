import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import AppBars from "@/components/AppBars";
import dynamic from "next/dynamic";
import { ToastProvider } from "@/hooks/useToast";
import InitialState from "@/components/InitialState";
const Providers = dynamic(() => import('@/components/Providers'), {
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"]
});

export const metadata: Metadata = {
  title: "Real Food Store",
  description: "create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
        <AppBars/>
          {children}
          <ToastProvider />
          <InitialState/>
        </Providers>
          
      </body>
    </html>
  );
}
