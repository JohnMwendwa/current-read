import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const addNewBook = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/books/new", {
      method: "POST",
      body: JSON.stringify({
        title,
        author,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.error) {
      toast.error(data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    } else {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
  };

  return (
    <form className=" flex-1 flex flex-col items-center justify-center w-full text-black">
      <label htmlFor="title" className="max-w-sm w-full">
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book Title"
          className="text-center rounded-md my-2 p-2 w-full border border-blue-500 outline-blue-500"
        />
      </label>
      <label htmlFor="author" className="max-w-sm w-full">
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="author name"
          className="text-center rounded-md my-2 p-2 w-full border border-blue-500 outline-blue-500"
        />
      </label>
      <button
        type="submit"
        className="max-w-sm w-full bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        onClick={addNewBook}
      >
        Add New Book
      </button>
    </form>
  );
};

export default AddBookForm;
