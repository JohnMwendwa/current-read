import mongoose from "mongoose";
import { verifyPassword } from "../../passwords";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

// Add a custom function for verifying user credentials
userSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });

  //   If email doesn't exist throw an error
  if (!user) {
    throw new Error("Invalid Credentials");
  }

  // compare the password with the one in the DB
  const match = await verifyPassword(password, user.password);

  //   If passwords don't match throw an error
  if (!match) {
    throw new Error("Invalid Credentials");
  }

  const userObject = user.toObject();

  //Remove user password from the returned string
  delete userObject.password;
  return userObject;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
