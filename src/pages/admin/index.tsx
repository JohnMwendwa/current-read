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
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mb-4"
      >
        <span className="text-2xl mr-2">+</span>
        Add New Book
      </Link>

      <BookList />
    </div>
  );
};

export default AdminPage;
