"use client"
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import MapSection from "./MapSection";
import { getContactPagePublicService } from "../../services/pages/contactpageService"
import { getPublicSettingsService } from "../../services/settingService"

export default function page() {
  const [data, setData] = useState()
  const [setting, setSetting] = useState();

  const fetchContactData = async () => {
    try {
      const res = await getContactPagePublicService();
      console.log("resposne", res?.data);
      setData(res?.data)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchSettingData = async () => {
    try {
      const res = await getPublicSettingsService();
      console.log("setting res", res?.data)
      setSetting(res?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { fetchContactData(), fetchSettingData() }, [])

  return (
    <div>
      <Banner data={data} />
      <MapSection data={setting} title={data} />
    </div>
  );
}
