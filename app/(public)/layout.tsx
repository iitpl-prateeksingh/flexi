import type { ReactNode } from "react";
import "../globals.css"
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="">{children}</main>
      <Footer />
    </>
  );
}
