import React from "react";
import Category from "@/../components/Category";
import PropertyCard from "@/../components/Cards";
import { propertyData } from "@/../constants/index";

function ExploreSection() {
  return (
    <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-20 py-8">
      <div className="flex justify-between mx-2 sm:mx-4 md:mx-6 lg:mx-15">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Explore</h1>
        <p className="text-primary font-bold text-sm sm:text-md md:text-lg">View more</p>
      </div>

      <div className="my-6 sm:my-8 md:my-10 mx-2 sm:mx-4 md:mx-6 lg:mx-15">
        <Category />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mx-2 sm:mx-4 md:mx-6 lg:mx-15">
        {propertyData.map((property, index) => (
          <PropertyCard
            key={index}
            propertyImage={property.propertyImage}
            userProfileImage={property.userProfileImage}
            location={property.location}
            bedrooms={property.bedrooms}
            dates={property.dates}
            price={property.price}
          />
        ))}
      </div>

      <div className="flex flex-col text-center justify-center items-center mt-6 gap-2">
        <p className="text-md sm:text-lg font-bold">Continue Exploring</p>
        <button
          type="button" 
          className="bg-black w-full sm:w-1/3 md:w-1/4 lg:w-[8%] text-white font-semibold text-sm p-2 sm:p-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          See More
        </button>
      </div>
    </div>
  );
}

export default ExploreSection;