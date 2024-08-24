import  User  from "../models/user.model.js";
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
export const signup = async (req, res) => {
  try {
    // Get the properties from the request body
    const { username, email, password } = req.body;

    // Check if any of the properties are missing
    if (!username || !email || !password) {
      // If so, return a 400 response with an error message
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if the email address already exists in the database
    const existingUser = await User.findOne({ email });

    // If it does, return a 409 response with an error message
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
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
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
