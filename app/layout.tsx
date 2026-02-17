import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PWAInstall } from "@/components/pwa-install";

export const metadata: Metadata = {
  title: "College Event Bridge",
  description: "Connect students with campus events",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "College Event Bridge",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="mx-auto max-w-[430px] min-h-screen">
          {children}
          <PWAInstall />
        </div>
      </body>
    </html>
  );
}
