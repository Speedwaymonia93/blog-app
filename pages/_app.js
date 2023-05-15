import "../styles/globals.scss";
import "tailwindcss/tailwind.css";
import React from "react";


import { Layout } from "../components";
import dynamic from "next/dynamic";

const DynamicHeader = dynamic(() => import("../components/GeneratedPDF"), {
  ssr: false,
});
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
