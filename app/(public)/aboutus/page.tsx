import React from 'react'
import Banner from './Banner'
import WeAreThe from './WeAreThe'
import OurFoundation from './OurFoundation'
import InsightsSection from '../HomePage/InsightsSection'
import CTASection from '../HomePage/CTASection'

export default function page() {
  return (
    <div>
      <Banner/>
      <WeAreThe/>
      <OurFoundation/>
       <InsightsSection/>
      <CTASection/>
    </div>
  )
}
