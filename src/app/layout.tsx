import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ThemeToggle } from "@/components/theme-toggle";
import { Telemetry } from "@/components/telemetry";
import { GlassController } from "@/components/glass-controller"; // NEW IMPORT
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DarkThemeEffects } from "@/components/dark-theme";
import { CosmicThemeEffects } from "@/components/cosmic-theme";
import { SolarThemeEffects } from "@/components/solar-theme"; 
import { LightThemeEffects } from "@/components/light-theme"; 

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
            {/* Ambient Background & Cursor Physics Layers */}
            <DarkThemeEffects />
            <CosmicThemeEffects />
            <SolarThemeEffects /> 
            <LightThemeEffects /> 
            
            {/* UI Layer */}
            <Header />
            <ThemeToggle />
            <GlassController /> {/* NEW COMPONENT */}
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