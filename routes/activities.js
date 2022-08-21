var express = require("express");
const activityIdGuard = require("../guards/activityIdGuard");
var router = express.Router();
const db = require("../model/helper");

//GET - main catalogue and filter search
router.get("/", async function (req, res) {
  const { query } = req.query;
  if (query) {
    try {
      const filteredActivities = await db(
        `SELECT * FROM activities WHERE description LIKE '%${query}%';`
      );
      res.send(filter.data);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    try {
      const results = await db("SELECT * FROM activities ORDER BY id ASC;");
      res.send(results.data);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

//POST new activity
router.post("/", async function (req, res) {
  const { name, age, description } = req.body;
  try {
    await db(
      `INSERT INTO activities (name, age, description) VALUES ('${name}', '${age}', '${description}');`
    );
    const results = await db("SELECT * FROM activities ORDER BY id ASC;");
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id", async function (req, res, next) {
  const { id } = req.params;
  const { name, age, description } = req.body;
  try {
    await db(
      `UPDATE activities  SET name='${name}', age =${age}, description='${description}' WHERE id=${Number(
        id
      )}`
    );
    res.status(200).send({ message: "activity updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//DELETE an activity by ID

router.delete("/:id", activityIdGuard, async function (req, res, next) {
  const { id } = req.params;
  try {
    await db(`DELETE FROM activities WHERE id = "${id}";`);
    res.send({ message: "activity deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
