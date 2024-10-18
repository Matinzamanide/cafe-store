import React from "react";

const SkeletonCard = () => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3">
      <div className="border rounded-lg overflow-hidden animate-pulse">
        <div className="top">
          <div className="w-full h-48 bg-gray-300"></div>
        </div>

        <div className="bottom px-8 pt-10">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>{" "}
          <div className="flex items-center justify-between pt-14 pb-4">
            <div className="h-6 bg-gray-300 rounded w-1/4"></div> 
            <div className="h-10 w-10 bg-gray-300 rounded-2xl"></div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
