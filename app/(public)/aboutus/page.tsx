"use client"
import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import WeAreThe from './WeAreThe'
import OurFoundation from './OurFoundation'
import InsightsSection from '../HomePage/InsightsSection'
import CTASection from '../HomePage/CTASection'
import { getAboutPageAdminService } from "../../services/pages/aboutpageService"

export default function page() {
  const [data, setData] = useState()
  const fetchAboutPage = async () => {
    try {
      const res = await getAboutPageAdminService();
      console.log("Response of about", res?.data?.contentRef)
      setData(res?.data?.contentRef)
    } catch (error: any) {
      console.log(error.message)
    }
  }
  useEffect(() => { fetchAboutPage() }, [])

  return (
    <div>
      <Banner data={data} />
      <WeAreThe data={data} />
      <OurFoundation data={data} />
      <InsightsSection />
      <CTASection />
    </div>
  )
}
