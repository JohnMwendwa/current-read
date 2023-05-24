import React from "react";
import { useRouter } from "next/router";

import EditBookForm, { EditBookFormProps } from "components/EditBookForm";
import mongoose from "mongoose";

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
