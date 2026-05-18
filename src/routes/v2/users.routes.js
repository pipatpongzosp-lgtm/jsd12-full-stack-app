import { Router } from "express";
import { User } from "../../modules/users/user.model.js";

export const router = Router();

const userResponse = (doc) => {
  const user = doc.toObject();
  delete user.password;
  return user;
};

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
});

router.post("/", async (req, res) => {
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
    return res.status(400).json({ success: false, error: err });
  }
});

router.delete("/", async(req,res)=>{
  const {}

  
})
