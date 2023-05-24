import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export interface EditBookFormProps {
  id: string;
  title: string;
  author: string;
}

const EditBookForm = ({ id, title, author }: EditBookFormProps) => {
  const [bookTitle, setBookTitle] = useState(title);
  const [bookAuthor, setBookAuthor] = useState(author);

  const handleBookEdit = async (e: FormEvent) => {
    e.preventDefault();

    if (!bookTitle.trim() || !bookAuthor.trim()) {
      return toast.error("Book title or author cannot be empty", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    const res = await fetch("/api/books/update", {
      method: "POST",
      body: JSON.stringify({
        id,
        bookTitle,
        bookAuthor,
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
    <form className=" flex-1 flex flex-col items-center justify-center w-full">
      <label htmlFor="title" className="max-w-sm w-full">
        <input
          type="text"
          id="title"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          placeholder="Book Title"
          className="text-center rounded-md my-2 p-2 w-full border border-gray-700"
        />
      </label>
      <label htmlFor="author" className="max-w-sm w-full">
        <input
          type="text"
          id="author"
          value={bookAuthor}
          onChange={(e) => setBookAuthor(e.target.value)}
          placeholder="author name"
          className="text-center rounded-md my-2 p-2 w-full border border-gray-700"
        />
      </label>
      <button
        type="submit"
        className="max-w-sm w-full bg-green-600 text-white px-4 py-2 rounded-md"
        onClick={handleBookEdit}
      >
        Update Book
      </button>
    </form>
  );
};

export default EditBookForm;
