import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getIngredientCategories } from "../services";
import { useAppContext } from "../services/context";
const Ingredients = ({ click }) => {
  const [ingredientCategories, setingredientCategories] = useState([]);
  const { language } = useAppContext();

  useEffect(() => {
    getIngredientCategories().then((newIngredientCategories) =>
      setingredientCategories(newIngredientCategories)
    );
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12 sm:w-full lg:mr-5">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {language === "en" ? "Pastry type" : "Typ ciasta"}
      </h3>
      {ingredientCategories &&
        ingredientCategories.map((ingredient) => {
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
              <span className="cursor-pointer ml-2">
                {" "}
                {language === "en"
                  ? ingredient.name
                  : ingredient.localizations[0].name}
              </span>
            </Link>
          );
        })}
    </div>
  );
};

export default Ingredients;
