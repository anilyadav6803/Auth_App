const bcrypt = require("bcrypt");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

require('dotenv').config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill the all details",
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    // Generate a JWT token
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET, // Replace with your actual secret key
      { expiresIn: "1h" }
    );
    user.token = token;
    user.password = undefined;
    const options = {
        expires: new Date(Date.now() + 3600000) // Set expiration to 1 hour from now
      };
      

    res.cookie("token",token , options).status(200).json({
        success : true,
        token , 
        user,
        message:'user logged in successfully '
    })

   
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    // Create a new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during user signup:", error);
    return res.status(500).json({
      success: false,
      message: "User registration failed",
    });
  }
};
