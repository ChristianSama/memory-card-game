import { useState, useEffect, useRef } from 'react';
import Scoreboard from './Components/Scoreboard';
import Gallery from './Components/Gallery';
import Modal from './Components/Modal';
import './css/App.css';

function App() {
  const [curScore, setCurScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [correctTries, setCorrectTries] = useState([]);


  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const counter = useRef(0);

  const gallerySize = 12;

  useEffect(() => {
    getChars();
  }, [])

  const restartGame = async (event) => {
    await getChars();
    setCurScore(0);
  }

  const imageLoad = () => {
    counter.current += 1;
    if (counter.current >= gallerySize) {
      setIsLoading(false);
    }
  }

  const getChars = async () => {
    setIsLoading(true);
    counter.current = 0;
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

  const handleImageClick = (event) => {
    event.preventDefault();
    const newTry = event.target.id;

    if (correctTries.includes(newTry)) {
      setCorrectTries([]);
      setCurScore(0);
      return;
    }

    //update score
    const newScore = curScore + 1;
    setCorrectTries(tries => [...tries, event.target.id]);
    setCurScore(newScore);
    if (newScore > bestScore) {
      setBestScore(newScore);
    }
  }

  return (
    <div className="app">
      <Scoreboard restartGame={restartGame} curScore={curScore} bestScore={bestScore}></Scoreboard>
      <Gallery gallerySize={gallerySize} 
               imageLoad={imageLoad} 
               isLoading={isLoading} 
               characters={characters} 
               handleClick={handleImageClick}></Gallery>
      <Modal></Modal>
    </div>
  );
}


export default App;