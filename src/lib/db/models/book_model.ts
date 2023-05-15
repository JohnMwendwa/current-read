import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
  },
  author: {
    type: String,
    required: [true, "Book author is required"],
  },
  start: {
    type: Date,
    default: Date.now,
  },
  end: Date,
});

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book;
