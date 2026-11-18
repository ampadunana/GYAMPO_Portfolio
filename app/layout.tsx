import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ebenezer Derrick Gyampo Ayeh — Pharmacy, People & Progress",
  description:
    "The work, ideas and community of Ebenezer Derrick Gyampo Ayeh — Doctor of Pharmacy graduate, medicines-safety advocate and student leader in Ghana.",
}

export const viewport: Viewport = {
  themeColor: "#f7f6f1",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
