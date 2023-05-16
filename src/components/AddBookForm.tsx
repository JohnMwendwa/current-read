import { FormEvent, useState } from "react";

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const addNewBook = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/book/new", {
      method: "POST",
      body: JSON.stringify({
        title,
        author,
      }),
      headers: {
        "Content-Type": "appication/json",
      },
    });
    const data = await res.json();

    if (data.error) {
      setError(data.error);
      return;
    } else {
      setMessage(data.message);
      return;
    }
  };

  return (
    <form className=" flex-1 flex flex-col items-center justify-center w-full">
      <label htmlFor="title" className="max-w-sm w-full">
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book Title"
          className="text-center rounded-md my-2 p-2 w-full border border-gray-700"
        />
      </label>
      <label htmlFor="author" className="max-w-sm w-full">
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="author name"
          className="text-center rounded-md my-2 p-2 w-full border border-gray-700"
        />
      </label>
      <button
        type="submit"
        className="max-w-sm w-full bg-green-600 text-white px-4 py-2 rounded-md"
        onClick={addNewBook}
      >
        Add New Book
      </button>
    </form>
  );
};

export default AddBookForm;
