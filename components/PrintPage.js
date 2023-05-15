import { forwardRef } from "react";
import React from "react";
import moment from "moment";
import Link from "next/link";

const ComponentToPrint = forwardRef((props, ref) => {
  const ingredientsArr = props.post.ingredients ? props.post.ingredients.split(",") : null;
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        let paragraphLength = obj.children.length;

        if (paragraphLength === 3) {
          const linkChildren = obj.children[1];
          return (
            <Link href={linkChildren.href} src={linkChildren.href}>
              <React.Fragment>{linkChildren.title}</React.Fragment>
            </Link>
          );
        } else {
          return (
            <p key={index} className="mb-8">
              {modifiedText.map((item, i) => (
                <React.Fragment key={i}>{item}</React.Fragment>
              ))}
            </p>
          );
        }

      case "bulleted-list":
            const bulletList = obj.children;
          
        const helperArrayBullet = [];
        bulletList.map((child) => {
          child.children.map((item) => {
            item.children.map((element) => {
              helperArrayBullet.push(element);
              return helperArrayBullet;
            });
          });
        });
        return (
          <ul>
            {helperArrayBullet.map((c) => (
              <li>{c.text}</li>
            ))}
          </ul>
        );
      case "numbered-list":
        const numberedList = obj.children;
        const helperArrayNumber = [];
        numberedList.map((child) => {
          child.children.map((item) => {
            item.children.map((element) => {
                helperArrayNumber.push(element);
            
              return helperArrayNumber;
            });
          });
           
        });
        return (
          <ol>
            {helperArrayNumber.map((c) => (
              <li>{c.text}</li>
            ))}
          </ol>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "block-quote":
        const paragraphBlockQuote = obj.children;
        return (
          <blockquote key={index} className="text-md font-semibold mb-4">
            {paragraphBlockQuote.map((item, i) => (
              <React.Fragment key={i}>{item.text}</React.Fragment>
            ))}
          </blockquote>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      
        const tableItems = obj.children;
        let helperArr = [];
        const paragraphChildren = obj.children;
        tableItems.map((item) => {
          const itemChildren = item.children;
          itemChildren.map((item) => {
            helperArr.push(item.children);

            return (
              <table>
                <thead>
                  {helperArr[0].map((item) => {
                    return <td>{item.text}</td>;
                  })}
                </thead>
                <tbody>
                  <tr>
                    {helperArr.map((item) => {
                      return <td>{item.text}</td>;
                    })}
                  </tr>
                </tbody>
              </table>
            );
          });
          
        });

        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      default:
        return modifiedText;
    }
  };
  return (
    <div ref={ref}>
      <div className="bg-white shadow-lg print:shadow-none rounded-lg lg:pb-8 pb-12 mb-8 ">
        <div className="relative overflow-hiddwn print:shadow-none shadow-md mb-6 img-div">
          <img
            src={props.post.featuredImage.url}
            alt={props.post.title}
            className="object-top w-full h-full rounded-t-lg print:w-full print:h-auto"
          />
        </div>
        <div className="px-4 lg:px-2">
          <div className="flex items-center mb-8 w-full">
            <div className="flex items-center  mb-4 lg:mb-0 w-full lg:w-auto mr-8s">
              <img
                alt={props.post.author.name}
                className="align-middle rounded-full"
                width="30px"
                height="30px"
                src={props.post.author.photo.url}
              />
              <p className="inline align-middle text-gray-700 ml-2 text-lg">
                {props.post.author.name}
              </p>
            </div>
            <div className="font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-2 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="align-middle">
                {moment(props.post.createdAt).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-left mb-4">
              {props.post.categories.map((category) => (
                <p className="bg-sky-400 p-2 rounded text-slate-50 w-1/5 text-center">
                  {category.name}
                </p>
              ))}
            </div>
             <div className="flex justify-left mb-4">
              {
                ingredientsArr ? ingredientsArr.map((ingredient) => (
              <p className="bg-sky-200 p-2 rounded text-slate-80 lg:w-1/5 sm:w-full text-center mr-2">
                {ingredient}
              </p>
            )) : null
                }
          </div>
            <h1 className="mb-8 text-3xl font-semibold"> {props.post.title}</h1>

            {props.post.content.raw.children.map((typeObj, index) => {
              const children = typeObj.children.map((item, itemindex) =>
                getContentFragment(itemindex, item.text, item)
              );

              return getContentFragment(index, children, typeObj, typeObj.type);
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ComponentToPrint;
