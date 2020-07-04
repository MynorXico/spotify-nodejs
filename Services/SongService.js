const dotenv = require('dotenv');
const axios = require('axios');
const qs = require('querystring');
const Song = require('../Models/Song').Song
dotenv.config();

const authAxios = axios.create({
    baseURL: 'https://accounts.spotify.com/api/',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ZWFjNDUxYWQ3MTYzNDZiOGE2NmQ4ZGJhY2Y5MDVmMmU6ODk4NDliNGVlNDU0NGFiY2JiZGMyNWNhZjkxYTZmNjg=' },
});

const getAccessToken = async () => {
    return new Promise((resolve, reject) => {
        authAxios.post('token', qs.stringify({
            'grant_type': 'refresh_token',
            'refresh_token': process.env.REFRESH_TOKEN,
            'client_id': process.env.CLIENT_ID
        })).then(({ status, data }) => {
            resolve(data.access_token);
        }).catch((err) => {
            reject({ 'error': true, 'message': "Couldn't get access token" });
        });
    });

}




const getAxiosInstance = async () => {
    return new Promise(async (resolve, reject) => {
        var accessToken = await getAccessToken();
        console.log("AccessToken: ", accessToken);
        resolve(axios.create({
            baseURL: 'https://api.spotify.com/v1/',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        }));
    })

}

exports.getPlaylistItems = async (playlistId) => {
    var axiosInstance = await getAxiosInstance();
    return new Promise((resolve, reject) => {
        axiosInstance.get(`playlists/${playlistId}/tracks`)
            .then(({ status, data }) => {
                var songs = data.items.map((item) => {
                    return new Song(item);
                })
                resolve(songs);
            })
            .catch((err) => {
                reject({ 'error': true, 'message': "Couldn't get access token" });
            });
    });
}

