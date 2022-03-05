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
  const [gameOver, setGameOver] = useState(false);
  const counter = useRef(0);

  const gallerySize = 12;
  let shuffledChars = [];

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

  //TODO: make it impossible to show 12 already guessed cards
  shuffledChars = shuffle([...characters]).slice(0, gallerySize);

  return (
    <div className="app">
      <Scoreboard restartGame={restartGame} curScore={curScore} bestScore={bestScore}></Scoreboard>
      <Gallery imageLoad={imageLoad} 
               isLoading={isLoading} 
               characters={shuffledChars} 
               handleClick={handleImageClick}></Gallery>
      <Modal></Modal>
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



export default App;