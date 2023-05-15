// import React, { useRef } from "react";
// import printIcon from "../images/printer.png";
// import Image from "next/image";
// import ReactToPrint from "react-to-print";
// import PrintPage from "./PrintPage";
// const Print = ({ post }) => {
//   let componentRef = useRef();
//   return (
//     <div className="flex flex-col items-center cursor-pointer rounded px-3 py-5 bg-black bg-opacity-20 mr-4 hover:bg-opacity-50">
//       <>
//         <ReactToPrint
//           trigger={() => (
//             <button type="button">
//               <p className="text-center text-white font-semibold pb-1 hover:text-sky-500">
//                 Print the post
//               </p>
//               <Image
//                 src={printIcon}
//                 width={50}
//                 height={50}
//                 className="block"
//                 alt="Print the recipie"
//               />
//             </button>
//           )}
//           content={() => componentRef}></ReactToPrint>
//         <PrintPage ref={(el) => (componentRef = el)} post={post} />
//       </>
//     </div>
//   );
// };

// export default Print;
import React, { useRef } from "react";

import { ReactToPrint, useReactToPrint } from "react-to-print";
import ComponentToPrint from "./PrintPage";

import printIcon from "../images/printer.png";
import Image from "next/image";

function Print({ post }) {
  let componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    // <>
    //   <div
    //     id="print_component"
    //     className="flex flex-col px-3 items-center cursor-pointer rounded px-3 py-5 bg-black bg-opacity-20 mr-4 hover:bg-opacity-50">

    //     <ReactToPrint
    //       className="flex items-center flex-col"
    //       trigger={() => (
    //         <button type="button">
    //           <p className="text-center text-white font-semibold pb-1 hover:text-sky-500">
    //             Print the post
    //           </p>
    //           <Image
    //             src={printIcon}
    //             width={50}
    //             height={50}
    //             className="block"
    //             alt="Print the recipie"
    //           />
    //         </button>
    //       )}
    //       content={() => componentRef}
    //     />

    //     <div style={{ display: "none" }}>
    //       <ComponentToPrint ref={(el) => (componentRef = el)} post={post} />
    //     </div>
    //   </div>
    // </>
    <div>
      <div
        style={{ display: "none" }} // This make ComponentToPrint show   only while printing
      >
        <ComponentToPrint ref={componentRef} post={post} />
      </div>
      <div className="flex flex-col px-3 items-center cursor-pointer rounded px-3 py-5 bg-black bg-opacity-20 mr-4 hover:bg-opacity-50">
        <button
          onClick={handlePrint}
          className="flex items-center flex-col"
          type="button">
          <p className="text-center text-white font-semibold pb-1 hover:text-sky-500">
            Print the post
          </p>
          <Image
            src={printIcon}
            width={50}
            height={50}
            className="block"
            alt="Print the recipie"
          />
        </button>
      </div>
    </div>
  );
}

export default Print;
