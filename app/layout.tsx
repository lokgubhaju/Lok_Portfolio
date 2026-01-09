import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { Montserrat, Poppins, Orbitron } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Lok Gubhaju | Frontend Engineer",
  description:
    "Lok Gubhaju is a frontend engineer with a passion for building high-performance websites and digital experiences that drive results.",
  keywords: [
    "frontend engineer",
    "web developer",
    "React",
    "Next.js",
    "portfolio",
  ],
  authors: [{ name: "Lok Gubhaju" }],
  creator: "Lok Gubhaju",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://lokgubhaju.com.np"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Lok Gubhaju | Frontend Engineer",
    description:
      "Lok Gubhaju is a frontend engineer with a passion for building high-performance websites and digital experiences that drive results.",
    siteName: "Lok Gubhaju Portfolio",
    images: [
      {
        url: "/images/Lok_avatar.png",
        width: 1200,
        height: 630,
        alt: "Lok Gubhaju | Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lok Gubhaju | Frontend Engineer",
    description:
      "Lok Gubhaju is a frontend engineer with a passion for building high-performance websites and digital experiences that drive results.",
    images: ["/images/Lok_avatar.png"],
    creator: "",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${poppins.variable} ${orbitron.variable}`}
    >
      <head>
        <Script id="gtm-base" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${
              process.env.GTM_ID || "GTM-P965W2K4"
            }');
          `}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${
            process.env.GA4_ID || "G-KJ7PSNF0S9"
          }`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA4_ID || "G-KJ7PSNF0S9"}');
          `}
        </Script>
        <meta
          name="google-site-verification"
          content="Gupa4F2tv4t5NspIx4Xrok-Js6PUKdGHv2OmcjLNues"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`antialiased box-border overflow-x-hidden`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${
              process.env.GTM_ID || "GTM-P965W2K4"
            }`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
