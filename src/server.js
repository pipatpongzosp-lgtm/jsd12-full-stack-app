import e from "express";
import { users } from "./mockData/fakeUsers.js";
import cors from "cors";

const app = e();
const PORT = 3000;

app.use(cors());
app.use(e.json());

app.get("/", (req, res) => {
  //.send = generic senfd
  res.send(`<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Express + Tailwind</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="min-h-screen bg-gray-50 text-gray-800">
      <main class="max-w-2xl mx-auto p-8">
        <div class="rounded-xl bg-white shadow-sm ring-1 ring-gray-100 p-8">
          <h1 class="text-3xl font-bold tracking-tight text-blue-600">
            Hello Client, I am your Server!
          </h1>
          <p class="mt-3 text-gray-600">
            This page is styled with <span class="font-semibold">Tailwind CSS</span> via CDN.
          </p>
          <div class="mt-6 flex flex-wrap items-center gap-3">
            <a href="/api/v2/users" class="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              GET /users
            </a>
            <span class="text-xs text-gray-500">Try POST/PUT/DELETE with your API client.</span>
          </div>
        </div>
        <footer class="mt-10 text-center text-xs text-gray-400">
          Express server running with Tailwind via CDN
        </footer>
      </main>
    </body>
  </html>`);
});

//define F/E must call with get method to B/E
app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
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

app.put("/users/:id", (req, res) => {
  //valid user who is update
  const user = users.find((u) => u.id === req.params.id);


  if (!user){
    return res.status(404).json({error:"User not found"})
  }

  const {username,email,password} = req.body;
  if (!username || !email) {return res .status(400)
    .json({error:"username, email and password are required!"});
  }


  user.username = username;
  user.email = email;
  user.password = password;
  res.status(200).json(user);
  
  
});
// app.patch();
// app.delete();

app.listen(PORT, () => {
  console.log(`Sever running on PORT:${PORT}💠🌐🔰🟢`);
});
