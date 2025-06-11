import React from 'react';
import Image from 'next/image';
import { Filter } from 'lucide-react';


function Category() {
  const categories = [
    { name: 'Cities', icon: '/icons/Skyline.png' },
    { name: 'Mountain', icon: '/icons/Mountain.png' },
    { name: 'Country', icon: '/icons/Countryside.png' },
    { name: 'Resort', icon: '/icons/Ski.png' },
    { name: 'Sea', icon: '/icons/Sunrise.png' },
    { name: 'River', icon: '/icons/Jungle.png' },
    { name: 'Village', icon: '/icons/Planting.png' },
    { name: 'Farm', icon: '/icons/Barn.png' }, // Reusing Barn for Farm as an example
    { name: 'Forest', icon: '/icons/Forest.png' },
    { name: 'Hiking', icon: '/icons/Hiking.png' },
  ];

  return (
    <div className="flex items-center justify-between ">
      {categories.map((category, index) => (
        <div key={index} className="flex flex-col items-center ">
          <Image
            src={category.icon}
            alt={category.name}
            width={40}
            height={40} // Adjusted height to match width for better proportion
            className="mb-2"
          />
          <p className="text-md font-semibold">{category.name}</p>
        </div>
      ))}
    <div className="flex items-center">
      <button className="bg-white text-black px-4 py-2 rounded-full flex items-center border border-gray-400">
        <Filter className="mr-2 h-4 w-4" /> {/* Matches the icon size in the image */}
        Filters
      </button>
    </div>
    </div>
  );
}

export default Category;