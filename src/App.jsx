import { useEffect, useState } from 'react'
import './App.css'
import { loginUrl } from './auth'
import { fetchSong } from './fetchSongs'
import { FileMusic } from 'lucide-react';

function App() {

  const [colors, setColors] = useState()
  const [token, setToken] = useState('')
  const [data, setData] = useState()
  const [previousData, setPreviousData] = useState()
  const [songTitle,setSongTitle] = useState('')
  const [songArtist,setSongArtist] = useState('')
  const [songimg,setSongImg] = useState('')
  const [progress,setProgress] = useState(0)


  useEffect(() => {
    window.localStorage.removeItem('token')
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
      console.error(err);
      })
    }, 3000);

    return () => clearInterval(interval);

  }, [])

  // useEffect(()=>{
  //   let title = document.getElementById('song-title') ;
  //   if (title ){title.style.color = `rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]})`};

  //   let artist = document.getElementById('song-artist')
  //   if (artist ){artist.style.color = `rgb(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]})`};

  //   let background = document.getElementById('song-info-container');
  //   if (background) {
  //     background.style.background = `linear-gradient(90deg,  rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]},1) 16%, rgba(${colors[0][0]-5}, ${colors[0][1]-5}, ${colors[0][2]-5},1) 100%)`;
  //   }
  // },[colors])  

  useEffect(() => {
    if (data ) {
      console.log(data);
      setSongTitle(data.name);
      setSongArtist(data.artists[0].name);
      setSongImg(data.album.images[0].url);
      // prominent(songimg,{sample:1},{ group: 500 }).then(colors=>{
      //   setColors(colors)
      //   console.log(colors)}
      // )
      // getAverageRGB(data.album.images[0].url).then(color => {
      //   setColor(color);
      //   console.log(color);
      // }).catch(err => {
      //   console.error(err);
      // });

      
    }
  }, [data])

  return (
    <>
      {!token ?
        <a href={loginUrl}>Login to Spotify</a>
        :<div id='widget-container'>
            <img id='song-img' src={songimg} alt='song-img'/>
            <div id='icon-container'>
              <FileMusic id='music-icon'/>
            </div>
            <div className="song-info-container">
              <h1 id='song-title'>{songTitle}</h1>
              <h2 id='song-artist'>{songArtist}</h2>
            </div>
       </div>}
    </>
  );
}

export default App
