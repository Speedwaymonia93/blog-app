import "../styles/globals.scss";
import "tailwindcss/tailwind.css";
import React from "react";


import { Layout } from "../components";
import dynamic from "next/dynamic";
import { AppWrapper } from "../services/context";

const DynamicHeader = dynamic(() => import("../components/GeneratedPDF"), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
    <Layout>
        <Component { ...pageProps } />
      </Layout>
       </AppWrapper>
  );
}

export default MyApp;
