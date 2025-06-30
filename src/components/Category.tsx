"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

function Category() {
  const categories = [
    { name: 'Cities', icon: '/icons/Skyline.png' },
    { name: 'Mountain', icon: '/icons/Mountain.png' },
    { name: 'Country', icon: '/icons/Countryside.png' },
    { name: 'Resort', icon: '/icons/Ski.png' },
    { name: 'Sea', icon: '/icons/Sunrise.png' },
    { name: 'River', icon: '/icons/Jungle.png' },
    { name: 'Village', icon: '/icons/Planting.png' },
    { name: 'Farm', icon: '/icons/Barn.png' },
    { name: 'Forest', icon: '/icons/Forest.png' },
    { name: 'Hiking', icon: '/icons/Hiking.png' },
  ];
  const scrollRef = useRef(null);

  const smoothScroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 150;
      const start = current.scrollLeft;
      const end = direction === 'left' ? start - scrollAmount : start + scrollAmount;
      const duration = 300;
      let startTime = null;

      const animateScroll = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const easeInOut = progress / duration < 0.5
          ? 2 * (progress / duration) * (progress / duration)
          : -1 + (4 - 2 * (progress / duration)) * (progress / duration);
        current.scrollLeft = start + (end - start) * easeInOut;

        if (progress < duration) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  return (
    <div className="flex items-center w-full ">
      <div ref={scrollRef} className="flex space-x-6 overflow-x-auto scrollbar-hide flex-1">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center min-w-[50px] cursor-pointer">
            <Image
              src={category.icon}
              alt={category.name}
              width={24}
              height={24}
              className="mb-2 object-contain"
            />
            <p className="text-xs font-medium text-center whitespace-nowrap text-gray-600">{category.name}</p>
          </div>
        ))}
      </div>
      
      <div className="flex flex-col items-center min-w-[50px] cursor-pointer ml-4">
        <Filter className="h-6 w-6 mb-2" />
        <p className="text-xs font-medium text-center whitespace-nowrap text-gray-600 hidden sm:block">Filters</p>
      </div>
    </div>
  );
}

export default Category;