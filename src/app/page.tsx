import React from 'react'
import HeroSection from '../components/HeroSection'
import ExploreSection from '../components/ExploreSection'
import TrendingNow from '../components/Trending'

function page() {
  return (
    <div>
      <HeroSection />
      <ExploreSection />
      <TrendingNow />
      {/* Add more sections as needed */}
    </div>
  )
}

export default page
