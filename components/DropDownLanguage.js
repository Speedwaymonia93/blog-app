import React, { useState } from "react";

const DropdownLanguage = ({defaultLanguage}) => {

  const [language, setLanguage] = useState(defaultLanguage);
console.log({defaultLanguage});
  const handleLangChange = evt => {
    const lang = evt.target.value;
    console.log(lang);
    setLanguage(lang);
    
  };

  return (
    <select onChange={handleLangChange} value={language}>
      <option value="pl">PL</option>
      <option value="en">EN</option>
    </select>
  );
};

export default DropdownLanguage;
