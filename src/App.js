import { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard';
import Gallery from './Gallery'
// import './App.css';

function App() {
  const [curScore, setCurScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages(10);
  }, [])

  const fetchImages = async (size) => {
    const url = 'https://rickandmortyapi.com/api/character';
    try {
      const response = await fetch(url);
      const json = await response.json();
      const characters = json.results;
      const imagesSources = [];

      let randomIndexes = []
      for (let i = 0; i < size; i++) {
        let index;
        do {
          index = Math.floor(Math.random() * characters.length);
        } while (randomIndexes.includes(index));
        randomIndexes.push(index);
        imagesSources.push(characters[index].image);
      }
      setImages(imagesSources);

    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <Scoreboard curScore={curScore} bestScore={bestScore}></Scoreboard>
      <Gallery images={images}></Gallery>
    </div>
  );
}

export default App;
