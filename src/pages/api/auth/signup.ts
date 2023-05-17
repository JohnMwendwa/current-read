import User from "lib/db/models/user_model";
import connectDB from "lib/db/connection";
import { hashPassword } from "lib/passwords";

export interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { firstName, lastName, email, password, confirmPassword }: UserProps =
    req.body;

  if (!email.trim() || !email.includes("@")) {
    res.status(400).json({
      error: "Invalid Email!",
    });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({ error: "Passwords don't match!" });
    return;
  }

  if (!password || password.trim().length < 7) {
    return res.status(400).json({
      error: "Password should not be less than 7 characters",
    });
  }

  try {
    await connectDB();

    const hashedPassword = await hashPassword(password);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
