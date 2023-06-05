import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { Types } from "mongoose";

import connectDB from "lib/db/connection";
import Book from "lib/db/models/book_model";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  // Check if user has valid session
  if (!session) {
    res.status(401).json({
      error: "Unauthorized access!",
    });
    return;
  }

  if (req.method === "DELETE") {
    try {
      // Check if book id is provided
      const { id } = req.body;
      if (!id) {
        res.status(422).json({
          error: "Unprocessable request 😎",
        });
        return;
      }

      // Chec if it is a valid id
      if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({
          error: "Book Not Found!",
        });
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
      // Check if book id is provided
      const { id } = req.body;
      if (!id) {
        res.status(422).json({
          error: "Unprocessable request 😎",
        });
        return;
      }

      // Chec if it is a valid id
      if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({
          error: "Book Not Found!",
        });
      }

      await connectDB();

      // Update book finish date
      const book = await Book.findById(id);
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
  } else if (req.method === "POST") {
    try {
      const { id, bookTitle, bookAuthor } = req.body;

      if (!bookTitle.trim() || !bookAuthor.trim()) {
        return res.status(422).json({
          error: "Book title and author can't be empty",
        });
      }

      await connectDB();

      const book = await Book.findById(id);

      if (!book) {
        return res.status(404).json({
          error: "This book doesn't exist!",
        });
      }

      // Update book
      book.title = bookTitle;
      book.author = bookAuthor;
      await book.save();

      return res.status(200).json({
        message: "Book has been updated",
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
