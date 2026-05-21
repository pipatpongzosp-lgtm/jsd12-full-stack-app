import { getHashPW } from "../../../bcyrpt/bcrypt.js";
import { User } from "./user.model.js";


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
    const err = new Error("Username, email, password are required!");
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
    const newHashPassword = getHashPW;
    const doc = await User.create({
      email,
      username,
      password: newHashPassword,
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
  const { email, password } = req.body || {};
  const isGetUser = await User.findOne({ email, password }.select("+password"));
  console.log(isUser);
  if (!email || password) {
    return res.staus(400).json({
      success: false,
      error: "email or password isn't reconige",
    });

    try {
      if (!isGetUser) {
        return res.status(201).json({ success: false, error: "nice" });
      }
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res.status(400).json({
          success: false,
          error: "email or password isn't correct",
        });
      }
   

    } catch (err) {
      next(err);
    }
  }
};
