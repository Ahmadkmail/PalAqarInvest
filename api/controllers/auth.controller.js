import  User  from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
/**
 * Signs up a new user
 *
 * This function expects the request to have all three of the following
 * properties in the request body:
 *   - username: The username the user wants to use
 *   - email: The email address the user wants to use
 *   - password: The password the user wants to use
 *
 * If any of these properties are missing, the function will return a 400
 * response with a JSON object containing an error message.
 *
 * If the email address already exists in the database, the function will
 * return a 409 response with a JSON object containing an error message.
 *
 * Otherwise, the function will create a new user in the database, and
 * return a 201 response with a JSON object containing a success message.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise} A promise that resolves with the response object
 */
export const signup = async (req, res, next) => {
  try {
    // Get the properties from the request body
    const { username, email } = req.body;
    const password  =  bcrypt.hashSync(req?.body?.password, 10);
    console.log(password)
    // Check if any of the properties are missing
    if (!username || !email || !password) {
      // If so, return a 400 response with an error message
      next(errorHandler(400, "All fields are required please make sure to fill them"));
    }

    // Check if the email address already exists in the database
    const existingUser = await User.findOne({ email }) || await User.findOne({ username });

    // If it does, return a 409 response with an error message
    if (existingUser) {
        next(errorHandler(409, "User already exists"));
    }

    // Create a new user in the database
    const newUser = new User({ username, email, password });

    // Save the new user to the database
    await newUser.save();

    // Return a 201 response with a success message
    res.status(201).json({
      message: "user created",
    });
  } catch (error) {
    // If anything goes wrong, catch the error, log it to the console, and
    // return a 500 response with an error message
    next(errorHandler(500,'internal server error :('));
  }

};
export const signin = async (req, res, next) => {
  try{
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    next(errorHandler(404, "User not found"));
  }
  if (bcrypt.compareSync(req?.body?.password, existingUser?.password)) {
    const {password : pass, ...rest} = existingUser._doc;
    const token = jwt.sign({id : existingUser._id}, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true }).status(200).json({...rest,success : true});
  }
  next(errorHandler(401, "Invalid credentials"));
  
}catch(error){
  next(errorHandler(500,'internal server error :('));   
}
}
