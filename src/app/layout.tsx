import "./globals.css";
import Navbar from "../components/navbar";
import ThemeButton from "../components/ThemeButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative bg-base-100 text-base-content">
        <Navbar ThemeButton={<ThemeButton />} />
        {children}
      </body>
    </html>
  );
}
