const userModel = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, pass } = req.body;

  if (!email || !pass || !name) {
    return res.status(400).json({
      message: "Please Fill All The Fields",
    });
  }

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
      id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    },
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
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

const login = async (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).json({
      message: "Please Fill All The Fields",
    });
  }

  const user = await userModel.findOne({
    email: email,
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  const isPassValid = await bcrypt.compare(pass, user.pass);

  if (!isPassValid) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login Successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

const getMe = async (req, res) => {
    try {
        const user = await userModel
            .findById(req.user.id)
            .select("name email");

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};

const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });

    return res.status(200).json({
        message: "Logged out successfully"
    });
};

module.exports = { register, login, getMe, logout };
