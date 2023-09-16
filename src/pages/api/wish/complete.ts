import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { Types } from "mongoose";

import connectDB from "lib/db/connection";
import Wish from "lib/db/models/wish_model";
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

  if (req.method === "PATCH") {
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
      const wish = await Wish.findById(id);
      wish.finished = !wish.finished;
      await wish.save();

      return res.status(201).json({
        message: "Wish status updated",
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

      const wish = await Wish.findById(id);

      if (!wish) {
        return res.status(404).json({
          error: "This book doesn't exist!",
        });
      }

      // Update book
      wish.title = bookTitle;
      wish.author = bookAuthor;
      await wish.save();

      return res.status(200).json({
        message: "Wish book has been updated",
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
