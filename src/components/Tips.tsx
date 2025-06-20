import React from 'react';
import Image from 'next/image';

const TravelGuideBanner = () => {
  return (
    <div className="w-full max-w-6xl px-32 py-4">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900">Travel Guides & Tips</h1>
      </div>

      {/* Main Banner Container */}
      <div className="relative w-[138%] h-[600px] rounded-2xl overflow-hidden shadow-2xl">
        {/* Background Image */}
        <Image
           src="/images/tips.png"
          alt="Travel destination with airplane window view"
          fill
          className="object-cover"
          priority
        />
        
        
        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center justify-between px-8 py-6">
          {/* Left Content */}
          <div className="flex-1 max-w-md">
            {/* Small Tag */}
            <div className="inline-block mb-4">
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                TAKE A TOUR
              </span>
            </div>
            
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Discover Our<br />
              <span className="text-orange-300">Travel Guideline</span>
            </h2>
            
            {/* Description */}
            <p className="text-gray-200 text-sm mb-6 leading-relaxed max-w-xs">
              An enim nullam tempor gravida donec enim congue magna at pretium purus pretium ligula rutrum luctus risus diam eget risus varius blandit sit amet non magna.
            </p>
            
            {/* Feature List */}
            <div className="space-y-2 mb-8">
              <div className="flex items-center text-white text-sm">
                <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Luctus risus diam eget</span>
              </div>
              <div className="flex items-center text-white text-sm">
                <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Donec enim congue magna</span>
              </div>
              <div className="flex items-center text-white text-sm">
                <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Blandit sit amet non magna</span>
              </div>
            </div>
            
            {/* CTA Button */}
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
              Learn more
            </button>
          </div>
          
         
        </div>
        
        {/* Bottom Banner Info */}
        <div className="absolute bottom-4 right-4 bg-blue-500 text-white px-3 py-1 rounded text-xs font-medium">
          1339 × 819
        </div>
      </div>
    </div>
  );
};

export default TravelGuideBanner;