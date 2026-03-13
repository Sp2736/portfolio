import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ThemeToggle } from "@/components/theme-toggle";
import { Telemetry } from "@/components/telemetry";
import { XRayLens } from "@/components/x-ray";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

export const metadata: Metadata = {
  title: "Swayam Patel | Architect & Developer",
  description: "Digital lab specimen. Exploring full-stack systems, AI, and scalable architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased overflow-x-hidden`}>
        <ThemeProvider>
          <SmoothScroll>
            <Header />
            <ThemeToggle />
            <XRayLens />
            <Telemetry />
            <main className="min-h-screen w-full relative flex flex-col">
              {children}
              <Footer />
            </main>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}