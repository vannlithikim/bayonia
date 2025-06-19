import React from 'react'
import HeroSection from '../components/HeroSection'
import ExploreSection from '../components/ExploreSection'
import TrendingNow from '../components/Trending'
import Events from '../components/Events'

function page() {
  return (
    <div>
      <HeroSection />
      <ExploreSection />
      <TrendingNow />
      <Events />
    </div>
  )
}

export default page
