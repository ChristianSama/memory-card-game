import { useState, useEffect } from 'react';
import './css/Gallery.css';

function Gallery(props) {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    getChars();
  }, [])

  const getChars = async () => {
    const maxPages = 42;
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

    } catch (error) {
      console.log("error", error);
    }
  };

  //get random sample of a particular size
  const gallerySize = 12;
  const shuffledChars = shuffle([...characters]).slice(0, gallerySize);

  const galleryChars = shuffledChars.map((char) => {
    return <img onClick={props.handleClick} src={char.image} key={char.id} id={char.id}/>
  });

  return (
    <div className="gallery">
      {galleryChars}
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