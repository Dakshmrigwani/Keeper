import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = AsyncHandler(async (req, res, next) => {
  try {
    console.log("cookies data abc", req.cookies.accessToken);
    // Attempt to extract the JWT token from cookies or the Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // If no token is found, throw an ApiError indicating unauthorized request
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // Verify the authenticity of the token using jwt.verify()
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find the corresponding user based on the user ID extracted from the token
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    // If no user is found, throw an ApiError indicating invalid access token
    if (!user) {
      throw new ApiError(401, "User not found");
    }

    // Attach the user object to the request and proceed with the next middleware
    req.user = user;
    next();
  } catch (error) {
    // If any error occurs during the verification process, throw an ApiError
    // with an appropriate error message
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
