import { Schema, model, Document, models, Model } from "mongoose";

interface BookProps extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  author: string;
  start: Date;
  end?: Date;
}

interface BookModel extends Model<BookProps> {}

const bookSchema = new Schema<BookProps, BookModel>({
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
  (models.Book as unknown as BookModel) ||
  model<BookProps, BookModel>("Book", bookSchema);

export default Book;
