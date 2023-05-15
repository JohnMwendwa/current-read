import { Schema, model, models, Document } from "mongoose";

interface Book extends Document {
  title: string;
  author: string;
  start: Date;
  end?: Date;
}

const bookSchema = new Schema<Book>({
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

const Book = models.Book || model("Book", bookSchema);

export default Book;
