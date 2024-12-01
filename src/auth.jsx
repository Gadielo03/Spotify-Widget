// auth.js
const CLIENT_ID = "0ab6b75d95f141509426ad5345280550"
const REDIRECT_URI = "https://gadielo03.github.io/"
//const REDIRECT_URI = "https://my.home-assistant.io/redirect/supervisor_ingress/?addon=https%3A%2F%2Fgadielo03.github.io%2Fspotify-widget%2F"
//const REDIRECT_URI = "https://gadielo03.github.io/spotify-widget/"
//const REDIRECT_URI = "http://localhost:8888/callback"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-currently-playing user-read-playback-state`

export { loginUrl }

