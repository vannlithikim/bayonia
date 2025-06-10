import React from "react";
import Category from "./Category";

function ExploreSection() {
  return (
    <div className="m-20">
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold">Explore</h1>
        <p className="text-primary font-bold text-md">View more</p>
      </div>

      <div>
        <Category />
      </div>
    </div>
  );
}

export default ExploreSection;
