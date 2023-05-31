import React, { useState, useEffect, useRef } from "react";
import { submitComment } from "../services";
import { useAppContext } from "../services/context";

const CommentsForm = ({ url }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();
  const { language } = useAppContext();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);
  const handleCommentSubmission = () => {
    setError(false);
    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      url,
    };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {language === "en" ? "Leave a reply" : "Zostaw komentarz"}
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          name="comment"
          placeholder="Comment"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          ref={nameEl}
          type="text"
          name="name"
          placeholder="Name"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />

        <input
          ref={emailEl}
          type="text"
          name="email"
          placeholder="Email"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeDate"
            name="storeData"
            value="true"
          />
          <label
            className="text-gray-500 cursor-poiner ml-2"
            htmlFor="storeData">
            {language === "en"
              ? "Save my name and email for the next time I comment."
              : "Zapisz imie i maila na przyszłość"}
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">
          {language === "en"
            ? " All fields are required"
            : "Wszystkie pola są wymagane"}
          .
        </p>
      )}

      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer">
          {language === "en" ? "Post Comment" : "Dodaj komentarz"}
        </button>
        {showSuccessMessage && (
          <span className="float-right text-xl font-semibold mt-3 text-green-500">
            {language === "en"
              ? " Comment submitted for review"
              : "Komentarz wysłany do akceptacji"}
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
