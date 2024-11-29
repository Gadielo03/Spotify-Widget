import axios from "axios";

const endpoint = "https://api.spotify.com/v1/me/player/currently-playing";

const fetchSong = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const res = await axios.get(endpoint, config);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export { fetchSong }