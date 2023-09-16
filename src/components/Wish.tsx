import { FaCheckSquare, FaEdit, FaRegSquare, FaTrash } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { WishProps } from "lib/db/models/wish_model";
import { FormEvent, useState } from "react";

interface Props extends WishProps {
  idx: number;
}

const Wish = ({ _id, title, author, finished, idx }: Props) => {
  const { status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [bookTitle, setBookTitle] = useState(title);
  const [bookAuthor, setBookAuthor] = useState(author);

  const handleCompleteWish = async () => {
    const res = await fetch("/api/wish/complete", {
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

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  const handleDelete = async () => {
    const res = await fetch("/api/wish/complete", {
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
  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/wish/complete", {
      method: "POST",
      body: JSON.stringify({ id: _id, bookTitle, bookAuthor }),
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
    <div className="flex items-center justify-between p-2 border rounded-md odd:bg-blue-100 even:bg-gray-100 shadow-md group">
      {isEditing ? (
        <form
          onSubmit={handleUpdate}
          className="flex flex-1 gap-2 justify-between"
        >
          <span className="">
            <input
              type="text"
              placeholder="Book title"
              className="border rounded-md px-2 py-1 mr-2 outline-none"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Author"
              className="border rounded-md px-2 py-1 outline-none"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
            />
          </span>
          <span>
            <button
              type="submit"
              className="bg-green-500 px-4 py-1 rounded-md mr-2"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleEdit}
              className="bg-red-500 px-4 py-1 rounded-md text-white"
            >
              cancel
            </button>
          </span>
        </form>
      ) : (
        <>
          <span>
            {idx + 1}.{" "}
            <span className={`${finished ? "line-through" : ""}`}>
              {title} - {author}
            </span>
          </span>
          {status === "authenticated" && (
            <span className="flex items-center gap-2">
              <span className="cursor-pointer" onClick={handleCompleteWish}>
                {finished ? (
                  <FaCheckSquare className="text-2xl text-blue-500 group-even:text-gray-500" />
                ) : (
                  <FaRegSquare className="text-2xl text-blue-500 group-even:text-gray-500" />
                )}
              </span>
              <span>
                <FaEdit
                  onClick={handleEdit}
                  className="text-2xl text-green-500 group-even:text-green-400 cursor-pointer"
                />
              </span>
              <span>
                <FaTrash
                  onClick={handleDelete}
                  className="text-2xl text-red-500 cursor-pointer"
                />
              </span>
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default Wish;
