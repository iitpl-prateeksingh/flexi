import React from 'react'
import HeroSection from './HomePage/HeroSection'
import KnowUs from './HomePage/KnowUs'
import SignatureApproach from './HomePage/SignatureApproach'
import ServicesGrid from './HomePage/ServicesGrid'
import WhyUs from './HomePage/WhyUs'
import TransparencySection from './HomePage/TransparencySection'
import InsightsSection from './HomePage/InsightsSection'
import CTASection from './HomePage/CTASection'

export default function Page() {
  return (
    <div>
      <HeroSection/>
      <KnowUs/>
      <SignatureApproach/>
      <ServicesGrid/>
      <WhyUs/>
      <TransparencySection/>
      <InsightsSection/>
      <CTASection/>
    </div>
  )
}
