import type { Metadata } from "next";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "WaveQ Q Docs",
  description: "Documentation hub for Q Agent and audio.dal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="ltr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${GeistSans.className} ${GeistMono.variable} antialiased`}>
        <ClerkProvider>
          <Providers>
            <div className="fixed right-3 top-3 z-[70] rounded-full border border-slate-700/80 bg-slate-950/85 px-3 py-2 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.7)] backdrop-blur">
              <Show when="signed-out">
                <div className="flex items-center gap-2">
                  <SignInButton mode="modal">
                    <button type="button" className="rounded-md border border-cyan-400/45 bg-cyan-500/15 px-2.5 py-1 text-xs font-semibold text-cyan-100 transition-colors hover:bg-cyan-500/25">
                      Sign in
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button type="button" className="rounded-md border border-slate-600/70 bg-slate-800/80 px-2.5 py-1 text-xs font-semibold text-slate-100 transition-colors hover:border-cyan-400/45 hover:text-cyan-100">
                      Sign up
                    </button>
                  </SignUpButton>
                </div>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
            {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
