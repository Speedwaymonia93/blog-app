import React, { useEffect, useState } from "react";
import pdfIcon from "../images/pdf.png";
import Image from "next/image";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./GeneratedPDF";

const DownloadPDF = ({ post }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col px-3 items-center cursor-pointer rounded px-3 py-5 bg-black bg-opacity-20 mr-4 hover:bg-opacity-50">
      {isClient && (
        <PDFDownloadLink
          className="flex items-center flex-col"
          document={<MyDocument post={post} fileName={`post.pdf`} />}>
          {({ blob, url, loading, error }) => {
            loading ? "Loading document" : "Download now!";
          }}
          <p className="text-center text-white font-semibold pb-1 hover:text-sky-500">
            Download PDF
          </p>
          <Image
            src={pdfIcon}
            width={50}
            height={50}
            className="block"
            alt="Download PDF file"
          />
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default DownloadPDF;
