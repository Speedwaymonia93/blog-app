import React from "react";
const FeaturedImages = ({ images }) => {
  const imagesList = images;
  return (
    <div className="flex flex-row flex-wrap space-between justify-center">
      {imagesList.map((image) => {
        return (
          <div className="rounded-md border-gray-50 border mr-2 mb-5 drop-shadow-md">
            <img src={image.url} alt={image.fileName} />
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedImages;
