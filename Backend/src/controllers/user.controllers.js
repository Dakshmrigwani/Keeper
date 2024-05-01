import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access tokens"
    );
  }
};

export const registerUser = AsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if ([email, password].some((field) => !field.trim())) {
      throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      throw new ApiError(409, "User with email already exists");
    }

    const user = await User.create({ email, password });

    return res
      .status(201)
      .json(new ApiResponse(200, user, "User registered successfully"));
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Cannot register user" });
  }
});

export const getAllUser = AsyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot get all users" });
  }
});

export const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
      throw new ApiError(404, "User does not exist");
    }

    const isPasswordCorrect = await existedUser.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      existedUser._id
    );
    // Find the logged-in user by their _id, excluding password and refreshToken fields

    const loggedInUser = await User.findById(existedUser._id).select(
      "-password -refreshToken"
    );

    // Configuration options for the cookies
    const options = {
      httpOnly: true, // Cookie is not accessible via JavaScript
      secure: true, // Cookie will only be sent over HTTPS
    };
    console.log(res);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser, // Send the logged-in user's data in the response
            accessToken,
            refreshToken,
          },
          "User logged in successfully"
        )
      );
      
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
});
