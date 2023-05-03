import React from "react";

const AddBookForm = () => {
  return (
    <form>
      <label htmlFor="title">
        <input type="text" id="title" />
      </label>
      <label htmlFor="author">
        <input type="text" id="author" />
      </label>
      <button type="submit">Add New Book</button>
    </form>
  );
};

export default AddBookForm;
