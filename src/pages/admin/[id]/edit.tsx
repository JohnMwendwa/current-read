import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Book from "lib/db/models/book_model";
import { Types } from "mongoose";

import EditBookForm, { EditBookFormProps } from "components/EditBookForm";
import connectDB from "lib/db/connection";

const EditPage = (props: EditBookFormProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center">
      <EditBookForm {...props} />

      {/* Back Button */}
      <div className="mt-auto">
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default EditPage;

export const getServerSideProps: GetServerSideProps = async (contx) => {
  const id = contx.query.id.toString();

  if (!Types.ObjectId.isValid(id)) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  await connectDB();
  const bookData = await Book.findById(id);

  if (!bookData) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }
  const bookJSON = JSON.stringify(bookData);
  const book = JSON.parse(bookJSON);

  return {
    props: {
      ...book,
      id: book._id,
    },
  };
};
