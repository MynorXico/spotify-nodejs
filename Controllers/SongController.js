var songService = require('../Services/SongService');
const dotenv = require('dotenv');
dotenv.config();

exports.test = async function(req, res){
    try{
        var songs = await songService.getPlaylistItems(req.params.id);
        res.send({'songs': songs});
    }catch(err){
        console.log(err);
        res.status(401);
        res.send({'message': err});
    }
}