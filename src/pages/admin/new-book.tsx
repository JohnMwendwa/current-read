import AddBookForm from "components/AddBookForm";
import Link from "next/link";

const NewBookPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <AddBookForm />
      <div className="mt-auto">
        <Link
          href="/admin"
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default NewBookPage;
