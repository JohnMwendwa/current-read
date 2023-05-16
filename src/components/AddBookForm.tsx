import React from "react";

const AddBookForm = () => {
  return (
    <form className=" flex-1 flex flex-col items-center justify-center w-full">
      <label htmlFor="title" className="max-w-sm w-full">
        <input
          type="text"
          id="title"
          placeholder="Book Title"
          className="text-center rounded-md my-2 p-2 w-full border border-gray-700"
        />
      </label>
      <label htmlFor="author" className="max-w-sm w-full">
        <input
          type="text"
          id="author"
          placeholder="author name"
          className="text-center rounded-md my-2 p-2 w-full border border-gray-700"
        />
      </label>
      <button
        type="submit"
        className="max-w-sm w-full bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Add New Book
      </button>
    </form>
  );
};

export default AddBookForm;
