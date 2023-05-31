import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";
import Image from "next/image";
import breadbasket from "../images/bread-basket-no-bg.png";
import baker from "../images/chef.png";
import Navigation from "./Navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useAppContext } from "../services/context";
const Header = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useAppContext();

  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <>
      <div className="container mx-auto md:px-10 sm:px-4 mb-8 hero-background max-w-full sm:w-full">
        <div className="w-full flex flex-col py-8 sm:w-full sm:text-center">
          <button
            type="button"
            className="hamburger-icon-button"
            onClick={toggle}>
            {isOpen ? (
              <GrClose className="hamburger-icon close-icon" />
            ) : (
              <GiHamburgerMenu className="hamburger-icon open-icon" />
            )}
          </button>
          <div className="flex align-center flex-col justify-center items-center align-center mb-4">
            <div className="flex flex-row">
              <Link href="/" className="flex flex-row mb-4">
                <Image src={baker} className="block md:mr-2 baker-img" />

                <span className="title cursor-pointer font-bold md:text-4xl text-white header sm:text-xs">
                  {language === "en"
                    ? "Monica's Oven - Bread & Pastries - Baking Blog"
                    : "Monica's Oven - Bread & Pastries \n - Blog cukierniczy"}
                </span>
              </Link>
            </div>

            <Image src={breadbasket} className="logo-style" />
          </div>

          {/* <div className='hidden md:float-left md:contents'> */}
          <div className="flex flex-row justify-center items-center category">
            {categories.map((category) => (
              <Link
                className="flex flex-row-reverse border-dashed border-r-4 border-indigo-500 px-10 category-item"
                key={category.url}
                href={`/category/${category.url}`}>
                {/* <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'> */}
                <span className="mt-2 align-middle text-white ml-4 font-semibold cursor-pointer hover:text-sky-500">
                  {language === "en"
                    ? category.name
                    : category.localizations[0].name}
                </span>
                <img
                  alt={category.name}
                  src={category.image.url}
                  width="30px"
                  height="30px"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      {isOpen && <Navigation click={toggle} />}
    </>
  );
};

export default Header;
