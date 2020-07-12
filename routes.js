var express = require('express');
var router = express.Router();

var songController = require('./Controllers/SongController');

router.get('/getPlaylistItems/:id', songController.test);
router.get('/', (req, res) => {res.send({'api': 'songs'})});
module.exports = router;