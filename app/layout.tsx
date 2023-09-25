// import './globals.css'
import { DM_Sans } from "next/font/google";
import '../styles/og.scss'

const sans = DM_Sans({
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={sans.className}>{children}</body>
    </html>
  )
}
