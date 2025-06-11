import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

type PropertyCardProps = {
  propertyImage: string;
  userProfileImage: string;
  location: string;
  bedrooms: number;
  dates: string;
  price: number;
};

function PropertyCard({
  propertyImage,
  userProfileImage,
  location,
  bedrooms,
  dates,
  price,
}: PropertyCardProps) {
  return (
    <div className="relative w-[220px] h-[300px] rounded-xl overflow-hidden">
      {/* Background Image (Top Section) */}
      <div className="relative w-[220px] h-[200px] rounded-xl overflow-hidden">
        <Image
          src={propertyImage}
          alt="Property Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
          unoptimized
        />
      </div>

      {/* User Profile Picture */}
      <div className="absolute top-2 left-2 w-6 h-6 rounded-full overflow-hidden border border-white shadow-sm">
        <div className="relative w-6 h-6 rounded-full overflow-hidden">
          <Image
            src={userProfileImage}
            alt="User Profile"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
            unoptimized
          />
        </div>
      </div>

      {/* Heart Icon */}
      <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center">
        <Heart
          className="w-6 h-6 text-white hover:text-red-500 transition-colors cursor-pointer"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        />
      </div>

      {/* Text Content (Bottom Section) */}
      <div className="absolute bottom-0 w-full py-2 pl-2">
        <div className="space-y-0.5">
          <h3 className="text-sm font-semibold text-gray-900 leading-tight">
            {location}
          </h3>
          <p className="text-xs text-gray-600">{bedrooms} Bedrooms</p>
          <p className="text-xs text-gray-600">{dates}</p>
          <p className="text-sm font-semibold text-gray-900 mt-1">
            ${price} per night
          </p>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;