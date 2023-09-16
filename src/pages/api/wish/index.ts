import Wish from "lib/db/models/wish_model";
import connectDB from "lib/db/connection";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(400).json({
      error: "Bad Request!",
    });
    return;
  }
  try {
    await connectDB();
    const wishes = await Wish.find({});

    res.status(200).json({
      wishes,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

export default handler;
