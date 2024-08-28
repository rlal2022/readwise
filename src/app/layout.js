import { Inter } from "next/font/google";
import "./css/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ReadWise - Your Personalized Book Recommendations",
  description:
    "Discover new books tailored to your taste with ReadWise. Add books to your library, and let our AI-powered recommendations guide your next great read.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
