var express = require('express');
const { getAllDirectors, postSingleDirector, updateSingleDirector,getSingleDirector,deleteSingleDirector,lookUpDirector} = require('../controllers/director');
var router = express.Router();




router.route('/lookup').get(lookUpDirector)



router.route('/:directorId')
.get(getSingleDirector)
.put(updateSingleDirector)
.delete(deleteSingleDirector)



router.route('/')
.get(getAllDirectors)
.post(postSingleDirector)









module.exports = router;
