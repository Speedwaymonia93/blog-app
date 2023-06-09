import React from "react";

import { useAppContext } from "../services/context";
const Author = ({ author }) => {
  const { language } = useAppContext();
  return (
    <div className="text-center mt-20 mb-8 relative rounded-lg bg-black bg-opacity-20">
      <div className="absolute left-0 right-2 -top-14">
        <img
          alt={author.name}
          height="100px"
          width="100px"
          className="align-middle rounded-full"
          src={author.photo.url}
        />
      </div>
      <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-lg">
        {language === "en" ? author.name : author.localizations[0].bio}
      </p>
    </div>
  );
};

export default Author;
