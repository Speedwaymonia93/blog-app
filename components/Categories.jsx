import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";

const Categories = ({ click }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12 sm:w-full lg:mr-5">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories.map((category) => {
        return (
          <Link
            className="flex flex-row items-center mb-4"
            key={category.url}
            href={`/category/${category.url}`}
            onClick={click}>
            <img
              alt={category.name}
              src={category.image.url}
              width="30px"
              height="30px"
            />
            <span className="cursor-pointer ml-2">{category.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;
