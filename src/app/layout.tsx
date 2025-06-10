import type { Metadata } from 'next';
import Header from "@/components/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Bayonia - Hotel Booking',
  description: 'Book hotels, transportations, and restaurants with Bayonia',
};

export default function RootLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="pt-[110px]">{children}</div>
      </body>
    </html>
  );
}