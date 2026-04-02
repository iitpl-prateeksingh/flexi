"use client"
import { useEffect, useState, type ReactNode } from "react";
import "../globals.css"
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { getPublicSettingsService } from "../services/settingService";

interface PublicLayoutProps {
  children: ReactNode;
}

export const dynamic = "force-dynamic";

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [setting, setSetting] = useState()
  const fetchSettingData = async () => {
    try {
      const res = await getPublicSettingsService();
      console.log("setting res", res?.data)
      setSetting(res?.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchSettingData()
  }, [])

  return (
    <>
      <Navbar data={setting} />
      <main className="">{children}</main>
      <Footer data={setting} />
    </>
  );
}
