import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AuthProvider } from "@/components/providers/auth-provider";
import { SITE_DESCRIPTION, SITE_NAME } from "@/data/site";
import { buildAbsoluteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(buildAbsoluteUrl("/")),
  title: {
    default: `${SITE_NAME} | Secure Image Resizer`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: [{ url: "/icon" }],
    apple: [{ url: "/apple-icon" }],
  },
  alternates: {
    canonical: buildAbsoluteUrl("/"),
  },
  openGraph: {
    title: `${SITE_NAME} | Secure Image Resizer`,
    description: SITE_DESCRIPTION,
    url: buildAbsoluteUrl("/"),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Secure Image Resizer`,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="app-shell min-h-full" suppressHydrationWarning>
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
