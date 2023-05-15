import { Model, Schema, model, models } from "mongoose";
import { verifyPassword } from "../../passwords";

interface User {
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserModel extends Model<User> {
  findByCredentials(email: string, password: string): User;
}

const userSchema = new Schema<User, UserModel>({
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
userSchema.static(
  "findByCredentials",
  async function findByCredentials(email: string, password: string) {
    const user = await this.findOne({ email });

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
  }
);

const User = model<User, UserModel>("User", userSchema);

export default User;
