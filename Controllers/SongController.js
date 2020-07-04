var songService = require("../Services/SongService");
const NodeCache = require("node-cache");
const dotenv = require("dotenv");
const myCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
dotenv.config();

exports.test = async function (req, res) {
  try {
    if (myCache.has(req.params.id)) {
      res.send(myCache.get(req.params.id));
    } else {
      var songs = await songService.getPlaylistItems(req.params.id);
      myCache.set(req.params.id, {songs: songs})
      res.send({ songs: songs });
    }
  } catch (err) {
    console.log(err);
    res.status(401);
    res.send({ message: err });
  }
};
