import React from "react";
import Link from "next/link";
import { FaEdit, FaTrash, FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { getDay, getYear } from "utils/format_date";

const BookCard = ({ _id, title, author, start, end }) => {
  const { status } = useSession();
  const router = useRouter();

  const handleDeleteBook = async () => {
    const res = await fetch("/api/books/update", {
      method: "DELETE",
      body: JSON.stringify({ id: _id }),
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
      router.reload();
      return;
    }
  };
  const handleCompleteBook = async () => {
    const res = await fetch("/api/books/update", {
      method: "PATCH",
      body: JSON.stringify({ id: _id }),
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
      router.reload();
      return;
    }
  };

  return (
    <div className="border-2 border-secondary rounded-md p-4 w-full relative shadow-md  shadow-gray-900/75">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl sm:text-2xl">{title}</h2>
        <span className="font-mono absolute top-0 right-0 bg-secondary text-white pl-3 pr-1 rounded-tr rounded-bl-2xl text-sm">
          {getYear(start)}
        </span>
      </div>
      <p className="text-sm">
        <span className="font-medium">author :</span> {author}
      </p>
      <div
        className="flex justify-between flex-col
       font-mono sm:flex-row"
      >
        <p className="text-sm">
          Start:{" "}
          <span className="font-bold text-blue-400">{getDay(start)}</span>
        </p>
        <p className="text-sm">
          Finish:{" "}
          {end ? (
            <span className="font-bold text-blue-400">{getDay(end)}</span>
          ) : (
            <span className="bg-orange text-white px-1 rounded-m  text-sm">
              Current Read
            </span>
          )}
        </p>
      </div>
      {status === "authenticated" && (
        <div className="flex justify-start border-t-2 border-secondary/75 pt-3 px-4 mt-4 -mx-4 text-xl">
          <span className="mr-4" title="edit book">
            <Link href={`/admin/${_id}/edit`}>
              <FaEdit className="text-blue-400 hover:text-blue-300 cursor-pointer text-2xl" />
            </Link>
          </span>
          <span className="mr-4" title="delete book">
            <FaTrash
              className="text-red-600 hover:text-red-500 cursor-pointer text-2xl"
              onClick={handleDeleteBook}
            />
          </span>
          <span onClick={handleCompleteBook}>
            {end ? (
              <FaCheckSquare
                title="mark as incomplete"
                className="text-green-400 hover:text-green-300 cursor-pointer text-2xl"
              />
            ) : (
              <FaRegSquare
                title="mark as complete"
                className="text-green-400 hover:text-green-300 cursor-pointer text-2xl"
              />
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default BookCard;
