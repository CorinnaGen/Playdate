var express = require('express');
var router = express.Router();
const favoriteActivityIdGuard = require("../guards/favoriteActvityIdGuard");
const userIdGuard = require("../guards/userIdGuard");
const db = require("../model/helper");

/* GET activities listing. */
router.get('/', async function(req, res, next) {
  try{
    const results
     = await db("SELECT * FROM favorities;");
    res.send(results.data);
  }
  catch(err){
       res.status(500).send(err);
  }
});

//ADD activity to favorities
router.post('/', favoriteActivityIdGuard, userIdGuard, async function(req, res, next) {
 
  const {activity_id, user_id} = req.body;

  try{
    await db(`INSERT INTO favorities (activity_id, user id) VALUES (${activity_id}, ${user_id})`)
    res.send({message: "activity added to favorities"});
  }
  catch(err){
       res.status(500).send(err);
  }
});

//DELETE an activity from fav
router.delete('/:id', favoriteActivityIdGuard,  async function(req, res, next) {
  
  const { id } = req.params;
  
  try{
    await db(`DELETE FROM favorities WHERE id = "${id}";`)
    res.send({message:"You not longer like this activity"});
  }
  catch(err){
       res.status(500).send(err);
  }
});


module.exports = router;
