var express = require('express');
const { getAllMovies, postSingleMovie, updateSingleMovie,getSingleMovie,deleteSingleMovie,getBetweenDates,getLimitedMovies,lookUpMovies } = require('../controllers/movies');
var router = express.Router();



router.route('/between/:start_year/:end_year').get(getBetweenDates)

router.route('/lookup').get(lookUpMovies)


router.route('/top/:limit')
.get(getLimitedMovies)


router.route('/:movies_id')
.get(getSingleMovie)
.put(updateSingleMovie)
.delete(deleteSingleMovie)


router.route('/')
.get(getAllMovies)
.post(postSingleMovie)










module.exports = router;
