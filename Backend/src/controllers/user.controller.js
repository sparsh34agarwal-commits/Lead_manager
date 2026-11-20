const userModel = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, pass } = req.body;

  const isEmailAlreadyExist = await userModel.findOne({
    email: email,
  });
  if (isEmailAlreadyExist) {
    return res.status(409).json({
      message: "Email Already In Use",
    });
  }

  const HashedPass = await bcrypt.hash(pass, 10);

  const user = await userModel.create({
    name,
    email,
    pass: HashedPass,
  });

  const token = jwt.sign(
    {
        userId: user._id
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn: "7d"
    }
);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "User Registered Successfully",
    user: {
        name: user.name,
        email: user.email
    }
  });
};

module.exports = { register };
