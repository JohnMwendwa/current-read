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
    <div className="border-2 border-black/20 rounded-md p-4 w-full relative shadow-sm  shadow-gray-900/75">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl sm:text-2xl">{title}</h2>
        <span className="font-mono absolute top-0 right-0 bg-black text-white pl-3 pr-1 rounded-tr rounded-bl-2xl text-sm">
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
            <span className="bg-blue-400 text-white px-1 rounded-m  text-sm">
              Current Read
            </span>
          )}
        </p>
      </div>
      {status === "authenticated" && (
        <div className="flex justify-start border-t-2 pt-3 mt-4 text-xl">
          <span className="mr-4" title="edit book">
            <Link href={`/admin/${_id}/edit`}>
              <FaEdit className="text-blue-400 cursor-pointer text-2xl" />
            </Link>
          </span>
          <span className="mr-4" title="delete book">
            <FaTrash
              className="text-red-600 cursor-pointer text-2xl"
              onClick={handleDeleteBook}
            />
          </span>
          <span title="mark as complete" onClick={handleCompleteBook}>
            {end ? (
              <FaCheckSquare className="text-green-600 cursor-pointer text-2xl" />
            ) : (
              <FaRegSquare className="text-green-600 cursor-pointer text-2xl" />
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default BookCard;
