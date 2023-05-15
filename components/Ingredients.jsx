import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getIngredientCategories } from "../services";

const Ingredients = ({ click }) => {
  const [ingredientCategories, setingredientCategories] = useState([]);

  useEffect(() => {
    getIngredientCategories().then((newIngredientCategories) =>
      setingredientCategories(newIngredientCategories)
    );
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12 sm:w-full lg:mr-5">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Pastry type</h3>
      {ingredientCategories.map((ingredient) => {
        return (
          <Link
            className="flex flex-row items-center mb-4"
            key={ingredient.url}
            href={`/ingredient/${ingredient.url}`}
            onClick={click}>
            <img
              alt={ingredient.name}
              src={ingredient.image.url}
              width="30px"
              height="30px"
            />
            <span className="cursor-pointer ml-2">{ingredient.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Ingredients;
