import Book from "lib/db/models/book_model";
import connectDB from "lib/db/connection";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(400).json({
      error: "Bad Request!",
    });
    return;
  }
  try {
    await connectDB();
    const books = await Book.find({});

    res.status(200).json({
      books,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

export default handler;
