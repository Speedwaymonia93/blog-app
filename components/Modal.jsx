import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import checkedIcon from "../images/checked.png";
import Image from "next/image";
const ModalSubscribe = ({
  isVisible,
  onClose,
  status,
  message,
  onValidated,
}) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  // console.log({ status });
  //   const [showModal, setShowModal] = useState(false);

  //   const handleFormSubmit = () => {
  //     setError(null);

  //     if (!email) {
  //       setError("Please enter a valid email address");
  //       return null;
  //     }
  //     if (!name) {
  //       setError("Please enter a valid name");
  //       return null;
  //     }
  //     const isFormValidated = onValidated({ EMAIL: email, NAME: name });

  //     // On success return true
  //     return email && email.indexOf("@") > -1 && name && name && isFormValidated;
  //   };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter a valid email address");
      return null;
    }
    if (!name) {
      setError("Please enter a valid name");
      return null;
    }

    const isFormValidated = onValidated({ EMAIL: email, FNAME: name });

    // On success return true
    return (
      name && name !== "" && email && email.indexOf("@") > -1 && isFormValidated
    );
  };

  const getMessage = (message) => {
    if (!message) {
      return null;
    }
    const result = message?.split("-") ?? null;
    if ("0" !== result?.[0]?.trim()) {
      return message;
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? formattedMessage : null;
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
      id="wrapper">
      <div className="sm:w-full md:w-6/12 flex flex-col">
        <button
          className="text-xl place-self-end rounded-full bg-red-400 p-3 border border-red-600 bg-orange-50"
          onClick={() => onClose()}>
          <GrClose className="close-modal-icon" />
        </button>
        <div className="bg-white p-6 rounded bg-gradient-to-r from-amber-500 via-yellow-500 to-pink-400">
          <h3
            className={
              "sending" === status || "success" === status
                ? "hidden"
                : "visible text-2xl font-semibold text-indigo-500 mb-5 text-center"
            }>
            Subscribe to the newsletter
          </h3>
          <form
            className="space-y-6"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            classNam="validate"
            target="_blank"
            noValidate>
            <div
              className={
                "sending" === status || "success" === status
                  ? "hidden"
                  : "visible"
              }>
              <label for="name" className="text-pink-700 font-bold">
                Name:{" "}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                required
                className="rounded p-3 w-full bg-gray-100 bg-opacity-50 text-blue-700 mt-2"
                onChange={(event) => setName(event?.target?.value ?? "")}
              />
            </div>

            <div
              className={
                "sending" === status || "success" === status
                  ? "hidden"
                  : "visible"
              }>
              <label for="email" className="text-pink-700 font-bold">
                Your email:{" "}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                required
                className="rounded p-3 w-full bg-gray-100 bg-opacity-50 text-blue-700 mt-2"
                onChange={(event) => setEmail(event?.target?.value ?? "")}
              />
            </div>

            <div
              className={
                "sending" === status || "success" === status
                  ? "hidden"
                  : "visible flex justify-center"
              }>
              <button
                type="button"
                className="m-5 rounded-full border border-rose-900 py-3 px-6 bg-red-600 text-white font-bold hover:bg-red-700 hover:text-gray-200"
                onClick={() => onClose()}>
                Cancel
              </button>
              <button
                onClick={handleFormSubmit}
                type="submit"
                className="m-5 border rounded-full border-lime-600 py-3 px-6 bg-lime-700 text-white font-bold hover:bg-lime-900 hover:text-gray-200">
                Subscribe
              </button>
            </div>

            <div className="min-h-42px">
              {"sending" === status ? <p>Sending ...</p> : null}
              {"error" === status || error ? (
                <div
                  className="text-red-700 pt-2"
                  dangerouslySetInnerHTML={{
                    __html: error || getMessage(message),
                  }}
                />
              ) : null}
              {"success" === status && "error" !== status && !error && (
                <>
                  <div className="flex flex-row text-center justify-center">
                    <div
                      className="text-green-700 text-center font-bold pt-2 text-3xl"
                      dangerouslySetInnerHTML={{ __html: message }}
                    />
                    <Image
                      src={checkedIcon}
                      width={50}
                      height={50}
                      className="block ml-2"
                      alt="Sucesfully subscribed"
                    />
                  </div>
                  <p className="text-green-600 text-center font-bold pt-2 text-xl">
                    You can close the window and refresh the page.
                  </p>
                </>
              )}
              {/* {"success" === status && "error" !== status && !error && (
                <div
                  className="text-green-700 text-center font-bold pt-2 text-3xl"
                  dangerouslySetInnerHTML={{ __html: message }}>
                  <Image
                    src={checkedIcon}
                    width={50}
                    height={50}
                    className="block"
                    alt="Sucesfully subscribed"
                  />
                </div>
              )} */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalSubscribe;
