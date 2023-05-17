import { getServerSession } from "next-auth/next";

import connectDB from "lib/db/connection";
import Book from "lib/db/models/book_model";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const session = await getServerSession(req, res, authOptions);

      // Check if user has valid session
      if (!session) {
        res.status(401).json({
          error: "Unauthorized access!",
        });
        return;
      }

      // Check if book id is provided
      const { id } = req.body;
      if (!id) {
        res.status(422).json({
          error: "Unprocessable request 😎",
        });
        return;
      }

      await connectDB();

      // Find and delete book
      await Book.findByIdAndDelete(id);

      return res.status(201).json({
        message: "Book deleted successfully",
      });
    } catch (e) {
      res.status(500).json({
        error: e.message,
      });
    }
  } else if (req.method === "PATCH") {
    try {
      const session = await getServerSession(req, res, authOptions);

      // Check if user has valid session
      if (!session) {
        res.status(401).json({
          error: "Unauthorized access!",
        });
        return;
      }

      // Check if book id is provided
      const { id } = req.body;
      if (!id) {
        res.status(422).json({
          error: "Unprocessable request 😎",
        });
        return;
      }

      await connectDB();

      // Update book finish date
      const book = await Book.findOne({ id });
      book.end = new Date();
      await book.save();

      return res.status(201).json({
        message: "Book status updated",
      });
    } catch (e) {
      res.status(500).json({
        error: e.message,
      });
    }
  } else {
    res.status(400).json({
      error: "Bad Request!",
    });
    return;
  }
};

export default handler;
