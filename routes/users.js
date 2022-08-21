var express = require("express");
// const emailGuard = require('../guards/emailGuard');
var router = express.Router();
const userIdGuard = require("../guards/userIdGuard");
const db = require("../model/helper");

//Get list of users
router.get("/", async function (req, res) {
  try {
    const results = await db("SELECT * FROM users ORDER BY id ASC;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", userIdGuard, async function (req, res) {
  try {
    const { id } = req.params;
    const results = await db(`SELECT * FROM users WHERE id="${id}";`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//CREATE USER
router.post("/", async function (req, res) {
  const { avatar, name, email, password, repeat_password } = req.body;

  const query = `INSERT INTO users (avatar, name, email, password, repeat_password) VALUES ('${avatar}','${name}', '${email}', '${password}', '${repeat_password}');`;

  try {
    const user = await db(query);
    res.status(201).send({ message: "User created!" });
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE PROFILE
router.delete("/:id", userIdGuard, async function (req, res) {
  const id = req.params.id;
  console.log(id);

  try {
    await db(`DELETE FROM users WHERE id ="${id}";`);
    res.send({ message: "Profile deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//UPDATE USER PROFILE
router.put("/:id", userIdGuard, async function (req, res) {
  const { id } = req.params;
  const { name, email, password, repeat_password } = req.body;

  try {
    await db(
      `UPDATE users SET name='${name}' email='${email}' password='${password}' repeat_password='${repeat_password}' avatar='${avatar}' WHERE id=${Number(
        id
      )}`
    );
    res.status(200).send({ message: "Profile updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
