const db = require("../model/helper");


async function userIdGuard(req, res, next) {
  try {
    const id = req.params.id;
    const results = await db(`SELECT * FROM users WHERE id="${id}";`); 
    if (!results.data) {
      return res.status(404).send({ message: "There is no user with this id" }); 
    }
    
    next(); 
  } catch (error) {
    
    res.status(500).send(error);
  }
}

module.exports = userIdGuard;