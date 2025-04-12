import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const monaSans = Mona_Sans({
  variable: "--font-Mona_Sans",
  subsets: ["latin"],
});



export const metadata = {
  title: "WiseInterview",
  description: "An AI-powered platform for preparing for mock interviews",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.className} antialiased pattern`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
