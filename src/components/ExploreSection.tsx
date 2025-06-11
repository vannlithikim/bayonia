import React from "react";
import Category from "@/../components/Category";
import PropertyCard from "@/../components/Cards";
import { propertyData } from "@/../constants/index";

function ExploreSection() {
  return (
    <div className="m-20">
      <div className="flex justify-between mx-15">
        <h1 className="text-3xl font-bold">Explore</h1>
        <p className="text-primary font-bold text-md">View more</p>
      </div>

      <div className="my-10 mx-15">
        <Category />
      </div>

      <div className="flex flex-wrap justify-between mx-15 gap-y-6">
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

      <div className="text-center mt-6">
          <button
            type="button" 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
           
          >
            See More
          </button>
        </div>
    </div>
  );
}

export default ExploreSection;