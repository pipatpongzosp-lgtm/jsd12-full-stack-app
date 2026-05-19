import { Router } from "express";
import { users } from "../../mockData/fakeUsers.js";

export const router = Router();

//define F/E must call with get method to B/E
router.get("/", (req, res) => {
  res.json(users);
});

router.post("/users", (req, res) => {
  const { username, email, password } = req.body || {}; //|| {} = prevent empty

  if (!username || !email) {
    return res.status(400).json({ error: "user name and email are required!" });
  }

  const nextId = String(
    (users.reduce((max, u) => (max, Number(u.id)), 0) || 0) + 1,
  ); //Make new id (+1 from last id), String because mock data id = String.

  const newUser = {
    id: nextId,
    username: username,
    email: email,
    password: password,
  }; //Can write { id: nextId, username, email } because key&value has same word.;

  users.push(newUser);

  return res.status(201).json(newUser);
});

router.put("/users/:id", (req, res) => {
  //valid user who is update
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const { username, email, password } = req.body;
  if (!username || !email) {
    return res
      .status(400)
      .json({ error: "username, email and password are required!" });
  }

  user.username = username;
  user.email = email;
  user.password = password;
  res.status(200).json(user);
});

router.delete("/user:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  delete user.id
  console.log(user.id)
});


// app.patch();
