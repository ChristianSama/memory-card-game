import { useState, useEffect, useRef } from 'react';
import '../css/Gallery.css';

function Gallery(props) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const counter = useRef(0);

  useEffect(() => {
    getChars();
  }, [])

  const imageLoad = () => {
    counter.current += 1;
    if (counter.current >= gallerySize) {
      setIsLoading(false);
    }
  }

  const getChars = async () => {
    const maxPages = 41;
    const randomPage = Math.floor(Math.random() * maxPages) + 1;
    const url = 'https://rickandmortyapi.com/api/character?page=' + randomPage;
    try {
      const response = await fetch(url);
      const json = await response.json();

      //cache images
      for (let char of json.results) {
        let img = new Image();
        img.src = char.image;
      }

      setCharacters(json.results);
      // setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  //get random sample of a particular size
  const gallerySize = 12;
  const shuffledChars = shuffle([...characters]).slice(0, gallerySize);

  const galleryChars = shuffledChars.map((char) => {
    return <img onLoad={imageLoad} onClick={props.handleClick} src={char.image} key={char.id} id={char.id}/>
  });

  const spinner = <h2>LOADING...</h2>

  return (
    <div>
      <div style={{display: isLoading ? "block" : "none"}}>{spinner}</div>
      <div className="gallery" style={{display: isLoading ? "none" : "grid"}}>{galleryChars}</div>
    </div>
  );
}

function shuffle(array) {
  //[1, 2, 3]
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default Gallery;