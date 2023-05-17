import { Schema, model, Document, models, Model } from "mongoose";

interface BookProps extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  author: string;
  start: Date;
  end?: Date;
}

const bookSchema = new Schema<BookProps>({
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

const Book =
  (models.Book as unknown as Model<BookProps>) ||
  model<BookProps>("Book", bookSchema);

export default Book;
