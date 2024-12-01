import { useEffect, useState } from 'react'
import './App.css'
import { loginUrl } from './auth'
import { fetchSong } from './fetchSongs'

function App() {
console.log(loginUrl);
  const [token, setToken] = useState('')
  const [data, setData] = useState()
  const [songTitle,setSongTitle] = useState('')
  const [songArtist,setSongArtist] = useState('')
  const [songimg,setSongImg] = useState('')
  const [useMarquee, setUseMarquee] = useState(false)


  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)

    const interval = setInterval(() => {
      fetchSong(token).then(data => {

      setData(data.item);
      }).catch(err => {
        window.localStorage.removeItem("token")
      })
    }, 1000);

    return () => clearInterval(interval);

  }, [])

  useEffect(() => {
    if (data ) {
      console.log(data);
      setSongTitle(data.name);
      setSongArtist(data.artists[0].name);
      setSongImg(data.album.images[0].url);
      data.name.length > 13 ? setUseMarquee(true) : setUseMarquee(false)
    }
  }, [data])

  return (
    <>
      {!token ?
        <a id='spotify-btn' href={loginUrl}>Sign in with Spotify</a>
        : data ? <div id='widget-container' >
            <img id='song-img' src={songimg} alt='song-img'/>
            <div id='icon-container'>
            <span class="material-symbols-outlined music-icon glow" id='music-icon'>
              library_music
            </span>
            </div>
            <div id="song-info-container">

              {useMarquee ? <marquee >
                <h1 id='song-title' >{songTitle}</h1>
              </marquee> :
              <h1 id='song-title' >{songTitle}</h1>}

              <h2 id='song-artist' class='glow'>{songArtist}</h2>
            </div>
      </div> : <div id='loading-container'>loading...</div>}
    </>
  );
}

export default App
