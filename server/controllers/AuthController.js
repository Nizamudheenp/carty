const UserDB = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await UserDB.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new UserDB({ name, email, password: hashed });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserDB.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }
    const isPasswordMatches = await bcrypt.compare(password, user.password)
    if (!isPasswordMatches) {
      return res.status(400).json({ message: 'password is incorrect' })
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
