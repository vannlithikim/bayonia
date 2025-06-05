import React from "react";
import Image from "next/image";

function HeroSection() {
  return (
    <div className="relative flex items-center justify-center">
      <Image
        src="/images/image1.jpeg"
        alt="Hero Background"
        width={1920}
        height={1080}
        className="w-[90%] h-[550px] object-cover rounded-t-2xl rounded-b-xl"
      />
      
      {/* Booking Box Overlay */}
      <div className="absolute -bottom-9 left-1/2 transform -translate-x-1/2 bg-white rounded-4xl shadow-xl py-3 px-7 w-[50%] ">
        <div className="flex flex-col md:flex-row items-center gap-5">
          {/* Where */}
          <div className="flex-1 ">
            <label className="block text-sm font-bold text-gray-700 ">
              Where
            </label>
            <input
              type="text"
              placeholder="Select your destination"
              className="w-full  border-0 text-gray-500 focus:outline-none text-sm"
            />
          </div>
          
          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-gray-300"></div>
          
          {/* Booking Date */}
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700">
              Booking Date
            </label>
            <input
              type="text"
              placeholder="19 Dec 2024 - 25 Dec 2024"
              className="w-full border-0 text-gray-500 focus:outline-none text-sm"
            />
          </div>
          
          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-gray-300"></div>
          
          {/* Guest & Room */}
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700">
              Guest&Room
            </label>
            <input
              type="text"
              placeholder="2 Adults & 1 Room"
              className="w-full border-0 text-gray-500 focus:outline-none text-sm"
            />
          </div>
          
          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-gray-300"></div>
          
          {/* Search Button */}
          <div className="flex items-end">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors duration-200"
              title="Search"
              aria-label="Search"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;