import React, { useState, useEffect } from "react";
import {
  getBlogSubjects,
  getCreatorDescription,
  getCountries,
} from "../services";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import NewsletterSubscribe from "./NewsletterSubscribe";
import DropdownLanguage from "./DropdownLanguage";
import { useAppContext } from "../services/context";

const Footer = () => {
  const [blogSubjects, setBlogSubjects] = useState([]);
  const [creatorDes, setCreatorDes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { language } = useAppContext();

  useEffect(() => {
    getBlogSubjects().then((newInfo) => setBlogSubjects(newInfo));
    getCreatorDescription().then((newDes) => setCreatorDes(newDes));
    getCountries().then((newCountires) => setCountries(newCountires));
  }, []);

  let des = "";
  let translatedDes = "";

  const getDes = creatorDes.map((item) => {
    des = item.creatorDescription;
    translatedDes = item.localizations[0].creatorDescription;
    return;
  });

  return (
    <div className="bg-neutral-800 footer-background">
      <div className="md:flex sm:flex md:flex-row sm:flex-col p-8 w-full justify-center">
        <div className="sm:basis-4/12 sm:basis-full md:border-dashed md:border-r-4 md:border-indigo-500 p-4">
          <h4 className="text-center text-sky-400 font-bold text-xl">
            {language === "en" ? "About me" : "O mnie"}
          </h4>
          <p className="text-slate-50 mt-4">
            {language === "en" ? des : translatedDes}
          </p>
        </div>
        <div className="sm:basis-4/12 sm:basis-full md:border-dashed md:border-dashed md:border-r-4 md:border-indigo-500 p-4">
          <h4 className="text-center text-sky-400 font-bold text-xl">
            {language === "en" ? " About the blog" : "O blogu"}
          </h4>
          <ul>
            {blogSubjects.map((subject, index) => {
              return (
                <div key={index} className="flex items-center w-full mb-2 mt-4">
                  <div className="">
                    <img
                      src={subject.image.url}
                      width="40px"
                      height="40px"
                      alt={subject.name}
                      className="align-middle "
                    />
                  </div>
                  <div className="flex-grow ml-2 text-slate-50">
                    {language === "en"
                      ? subject.name
                      : subject.localizations[0].name}
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="sm:basis-4/12 sm:basis-full ">
          <h4 className="text-center text-sky-400 font-bold text-xl p-4">
            {language === "en" ? " Where to find me" : "Gdzie mnie znajdziesz"}
          </h4>
          <div className="flex justify-center flex-row mb-8 content-between">
            <Link
              href="https://www.facebook.com/profile.php?id=100092516230953"
              target="_blank">
              <FaFacebookSquare className="facebook-icon" size={50} />
            </Link>
            <Link
              href="https://www.instagram.com/monicasoven_pastries_and_bread/"
              target="_blank">
              <FaInstagramSquare className="instagram-icon" size={50} />
            </Link>
            <Link href="mailto:monika.strzalka.bakery@gmail.com">
              <MdEmail className="email-icon" size={50} />{" "}
            </Link>
            {/* <Link href="#">
              <FaFacebookMessenger className="messenger-icon" size={50} />{" "}
              
            </Link> */}
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="rounded-full transition duration-500 ease transform hover:-translate-y-1 bg-blue-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
              {language === "en"
                ? "Subscribe to the newsletter"
                : "Zapisz sie do newslettera"}
            </button>
          </div>
          <div className="flex justify-center mt-5">
            <DropdownLanguage />
          </div>
        </div>
      </div>

      <div className="w-full text-center p-4 text-slate-300">
        <p>
          {language === "en"
            ? `© 2023 Monica's Oven - Bread & Pastries
          All rights reserved. Reproduction and distribution without permission
          Monica's Oven - Bread & Pastries prohibited.`
            : `© 2023 Monica's Oven - Bread & Pastires
          Wszystkie prawa zastrzeżone. Kopiowanie i rozpowszechnianie bez zgody
          Monica's Oven - Bread & Pastries zabronione`}
        </p>
      </div>
      <NewsletterSubscribe
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
      {/* <MailchimpSubscribe
        url={MAILCHIMP_URL}
        render={(props) => {
          const { subscribe, status, message } = props || {};
          return (
            <ModalSubscribe
              status={status}
              message={message}
              onValidated={(formData) => subscribe(formData)}
              isVisible={showModal}
              onClose={() => setShowModal(false)}
            />
          );
        }}
      /> */}
    </div>
  );
};

export default Footer;
