import { Router } from "express";
import { User } from "../../modules/users/user.model.js";
import { supabase } from "../../config/supabase.js";
import {
  getUsers,
  createUsers,
  deleteUsers,
  createUserResponse,
  userLogin,
  putUsers,
} from "../../modules/users/users.controllerv2.js"

export const router = Router();

// MongoDB routes (/api/v2/users)

const userResponse = (doc) => {
  const user = doc.toObject();
  delete user.password;
  return user;
};

router.get("/", getUsers);
router.post("/", createUsers);
router.delete("/:id", deleteUsers);
router.post("/register", createUserResponse);
router.post("/login", userLogin);
router.put("/user:id", putUsers);


// Supabase
const PG_SELECT = "id, username, email,role, created_at, updated_at";

router.get("/pg", async (req, res) => {
  try {
    const { data, error } = await supabase.from("users").select(PG_SELECT);

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

router.post("/pg", async (req, res) => {
  const { username, email, password, role } = req.body || {}; //|| {} = if empty -> go next.
  //role set default as "user" in user.model.js
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      error: "username, email, and password are requried",
    });
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .insert({ username, email, password, role: role || "user" })
      .select(PG_SELECT)
      .single();

    if (error) throw error;

    return res.status(201).json({ success: true, data });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

// router.delete("/user:id", async (req, res) => {
//   const user = users.find((u) => u.id === req.params.id);
//   delete user.id
//   console.log(user.id)
// });
// router.delete("/:id", 
