import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCountries } from "../services";
import { useAppContext } from "../services/context";
const Countries = ({ click }) => {
  const [countries, setCountries] = useState([]);
  const { language } = useAppContext();

  useEffect(() => {
    getCountries().then((newCountries) => setCountries(newCountries));
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12 sm:w-full lg:mr-5 bg-opacity-60 backdrop-filter backdrop-blur-lg">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {language === "en" ? "Countires" : "Kraje świata"}
      </h3>
      {countries.map((country) => {
        return (
          <Link
            className="flex flex-row items-center mb-4"
            key={country.url}
            href={`/country/${country.url}`}
            onClick={click}>
            <img
              alt={country.name}
              src={country.image.url}
              width="30px"
              height="30px"
            />
            <span className="cursor-pointer ml-2">
              {language === "en" ? country.name : country.localizations[0].name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default Countries;
