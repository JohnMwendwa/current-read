import { Schema, model, Document, models, Model } from "mongoose";

export interface WishProps extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  author: string;
  finished: boolean;
}

const wishSchema = new Schema<WishProps>({
  title: {
    type: String,
    required: [true, "Book title is required"],
  },
  author: {
    type: String,
    required: [true, "Book author is required"],
  },
  finished: {
    type: Boolean,
    default: false,
  },
});

const Wish =
  (models.Wish as unknown as Model<WishProps>) ||
  model<WishProps>("Wish", wishSchema);

export default Wish;
