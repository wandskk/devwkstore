import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { APP_CONSTANTS } from "@/lib/constants/app";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

import "@/assets/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_CONSTANTS.name}`,
    default: APP_CONSTANTS.name,
  },
  description: APP_CONSTANTS.description,
  metadataBase: new URL(APP_CONSTANTS.serverUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
