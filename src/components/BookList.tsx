import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await fetch("/api/books");
    const data = await res.json();

    if (data.error) {
      return;
    }
    setBooks(data.books);
  };
  return (
    <>
      {books.length ? (
        <div className="max-w-3xl w-full grid gap-5">
          {books.map((book) => {
            return <BookCard key={book._id} {...book} />;
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full flex-1 text-2xl text-red-600 font-bold font-mono">
          User is Very Lazy!
        </div>
      )}
    </>
  );
};

export default BookList;
