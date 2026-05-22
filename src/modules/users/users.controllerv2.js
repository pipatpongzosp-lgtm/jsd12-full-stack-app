import { getHashPW } from "../../../bcyrpt/bcrypt.js";
import { User } from "./user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, data: users });
  } catch (err) {
    // return res.status(400).json({ success: false, error: error });
    next(err);
  }
};

export const createUsers = async (req, res, next) => {
  const { username, email, password, role } = req.body || {}; //|| {} = if empty -> go next.
  //role set default as "user" in user.model.js
  if (!username || !email || !password) {
    const err = new Error("username, email, password are required!");
    err.name = "ValidationError";
    err.status = 400;
    return res.status(400).json({ success: false, error: err }); //If error use err for show error details.
  }

  try {
    const doc = await User.create({ username, email, password, role });
    return res.status(201).json({ success: true, data: userResponse(doc) });
  } catch (err) {
    // return res.status(400).json({ success: false, error: err });
    next(err);
  }
};

export const deleteUsers = async (req, res, next) => {
  try {
    const doc = await User.findByIdAndDelete(req.params.id);

    if (!doc) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    return res.status(200).json({ success: true, data: doc });
  } catch (err) {
    // return res.status(400).json({ success: false, error: err });
    next(err);
  }
};

// register with hash
export const createUserResponse = async (req, res, next) => {
  // const userReq = ({ username, email, password } = req.body || {});
  const { username, email, password } = req.body || {};
  const userExits = await User.findOne({ email: email, username: username });
  if (!username || !email) {
    console.error(`email & password requried:${err}`);
    next(err);
  }
  try {
    if (userExits) {
      return res.status(400).json({
        success: false,
        error: "User accout has already exits",
      });
    }
    const doc = await User.create({
      email,
      username,
      password: password,
    });
    return res.status(201).json({
      success: true,
      data: doc,
    });
  } catch (err) {
    next(err);
  }
};

export const userLogin = async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};
    const isGetUser = await User.findOne({ email: email }).select("+password");

    if (!isGetUser) {
      return res.status(201).json({ success: false, error: "nice" });
    }

    const isMatched = await bcrypt.compare(password, isGetUser.password);
    if (!isMatched) {
      console.log(password, isGetUser.password);

      return res.status(400).json({
        success: false,
        error: "Invalid email or password tesetsdf",
      });
      
    }

    const token = jwt.sign({ userId: isGetUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: isProd, // only send over HTTPS in production
      sameSite: isProd ? "none" : "lax",
      path: "/",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        _id: isGetUser._id,
        username: isGetUser.username,
        email: isGetUser.email,
        role: isGetUser.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const auhtenUser = async (req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: isProd, // Only send over HTTPS in production
    sameSite: isProd ? "none" : "lax",
    path: "/",
  });

  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully." });
};
