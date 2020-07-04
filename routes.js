var express = require('express');
var router = express.Router();

var songController = require('./Controllers/SongController');

router.get('/getPlaylistItems/:id', songController.test);

module.exports = router;