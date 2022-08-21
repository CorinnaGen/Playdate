const db = require("../model/helper");


async function activityIdGuard(req, res, next) {
  try {
    const { id } = req.params;

    const results = await db(`SELECT * FROM activities WHERE id="${id}";`); 
    if (!results.data) {
      return res.status(404).send({ message: "There is no activity with this id" }); 
    }
    next(); 
  } catch (error) {
    
    res.status(500).send(error);
  }
}

module.exports = activityIdGuard;