import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import BookList from "components/BookList";

const AdminPage = () => {
  const { data: session, status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <Link
        href="/admin/new-book"
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 pt-1 pb-2 rounded-lg mb-4"
      >
        <span className="text-2xl mr-2">+</span>
        Add New Book
      </Link>

      <BookList />
    </div>
  );
};

export default AdminPage;
