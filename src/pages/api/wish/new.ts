import { getServerSession } from "next-auth/next";

import connectDB from "lib/db/connection";
import Wish, { WishProps } from "lib/db/models/wish_model";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).json({
      error: "Bad Request!",
    });
    return;
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    // Check f user has valid session
    if (!session) {
      res.status(401).json({
        error: "Unauthorized access!",
      });
      return;
    }

    // Check if title and author are provided
    const { title, author }: WishProps = req.body;
    if (!title.trim() || !author.trim()) {
      res.status(422).json({
        error: "Book title and author must be provided",
      });
      return;
    }

    const newWish = new Wish({
      title,
      author,
    });

    await connectDB();

    // Save new book wish in the database
    await newWish.save();

    return res.status(201).json({
      message: "New book wish added successfully",
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

export default handler;
