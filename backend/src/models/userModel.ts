import db from "../config/db-setup";
import { User } from "../../../shared/types/user.interface";
import bcrypt from "bcrypt";

const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await db("users").where({ email }).first();
    if (!result) {
      return null; // No user found
    }
    return result as User;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user by email.");
  }
};

const getUserById = async (id: number) => {
  try {
    const user = await db("users").where({ id }).first();
    if (!user) {
      return null; // No user found
    }
    return user;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    throw new Error("Failed to fetch user by id.");
  }
};

//Create a user
const createUser = async (email: string, password: string): Promise<User> => {
  try {
    // Insert the user and return the created record
    const [user] = await db("users").insert({ email, password }).returning("*");
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user.");
  }
};

const updateUser = async (id: number, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password in the database
    const rowsAffected = await db("users")
      .where({ id })
      .update({ password: hashedPassword });

    // If no rows are affected, the user was not found or update failed
    if (rowsAffected === 0) {
      throw new Error("User not found or update failed");
    }

    // Return a success message
    return { message: "User updated successfully" };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user.");
  }
};
module.exports = {
  getUserByEmail,
  createUser,
  getUserById,
  updateUser,
};
