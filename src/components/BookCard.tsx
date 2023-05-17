import React from "react";
import { FaEdit, FaTrash, FaCheckSquare } from "react-icons/fa";

const BookCard = ({ title, author, start, end, edit }) => {
  return (
    <div className="border rounded-md p-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">{title}</h2>
        <span className="font-mono">2023</span>
      </div>
      <p>
        <span className="font-medium text-sm">author :</span> {author}
      </p>
      <div className="flex justify-between font-mono">
        <p>
          Start: <span className="font-bold text-blue-400">{start}</span>
        </p>
        <p>
          Finish:{" "}
          {end ? (
            <span className="font-bold text-blue-400">223-12-5</span>
          ) : (
            <span className="bg-blue-400 text-white px-2 rounded-md py-1 text-sm">
              Current Read
            </span>
          )}
        </p>
      </div>
      {edit && (
        <div className="flex justify-start border-t-2 pt-3 mt-4 text-xl">
          <span className="mr-4" title="edit book">
            <FaEdit className="text-blue-400 cursor-pointer" />
          </span>
          <span className="mr-4" title="delete book">
            <FaTrash className="text-red-600 cursor-pointer" />
          </span>
          <span title="mark as complete">
            <FaCheckSquare className="text-green-600 cursor-pointer" />
          </span>
        </div>
      )}
    </div>
  );
};

export default BookCard;
