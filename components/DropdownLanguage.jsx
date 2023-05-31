import React, { useState } from "react";
import { useAppContext } from "../services/context";

const DropdownLanguage = () => {
  const { language, setLanguage } = useAppContext();
  const handleLangChange = (evt) => {
    const lang = evt.target.value;
    setLanguage(lang);
  };

  return (
    <select
      onChange={handleLangChange}
      value={language}
      className="language-selector rounded-md border-red-300 py-3 px-2 bg-sky-400 text-white text-bold w-30 text-xl">
      <option value="pl" className="language-option text-xl">
        🇵🇱PL
      </option>
      <option value="en" className="language-option text-xl">
        🇺🇸 EN
      </option>
    </select>
  );
};

export default DropdownLanguage;
