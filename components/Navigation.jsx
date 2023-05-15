import React, { useState } from "react";
import Categories from "./Categories";
import Ingredients from "./Ingredients";
import Countries from "./Countries";

const Navigation = ({ click }) => {
  return (
    <div className="flex flex-row w-full pt-10 footer-background nav">
      <Categories click={click} className="basis-4/12" />
      <Ingredients click={click} className="basis-4/12" />
      <Countries click={click} className="basis-4/12" />
    </div>
  );
};

export default Navigation;
