import { Router } from "express";
import {products} from "../../mockData/fakeProducts"

//define F/E must call with get method to B/E
router.get("/", (req, res) => {
  res.json(products);
});

router.post("/products", (req, res) => {
  const { nameProduct, price, QTY } = req.body || {}; //|| {} = prevent empty

  if (!username || !email) {
    return res.status(400).json({ error: "pls select product!" });
  }

  const nextId = String(
    (users.reduce((max, p) => (max, Number(p.id)), 0) || 0) + 1,
  ); //Make new id (+1 from last id), String because mock data id = String.

  const newProduct = {
    id: nextId,
    nameProduct: nameProduct,
    price: price,
    QTY: QTY,
  }; //Can write { id: nextId, username, email } because key&value has same word.;

  users.push(newProduct);

  return res.status(201).json(newProduct);
});

router.put("/products/:id", (req, res) => {
  //valid user who is update
  const product = product.find((products) => products.id === req.params.id);

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
// app.patch();
