import React from 'react'
import Image from 'next/image'

function Events() {
  return (
    <div className="px-32 my-16">
      <h2 className="text-3xl font-bold mb-6 text-black">Special Offers</h2>
      
      <div className="flex flex-row gap-10 overflow-x-auto">
        <div className="flex-shrink-0">
          <Image
            src="/images/offer1.png"
            alt="Opening Sale - 70% off"
            width={280}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
        
        <div className="flex-shrink-0">
          <Image
            src="/images/offer2.png"
            alt="Restaurant Open - Free Delivery"
            width={280}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
        
        <div className="flex-shrink-0">
          <Image
            src="/images/offer3.png"
            alt="Street Party Event"
            width={280}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="flex-shrink-0">
          <Image
            src="/images/offer1.png"
            alt="Opening Sale - 70% off"
            width={280}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default Events