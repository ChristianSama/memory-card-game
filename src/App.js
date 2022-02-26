import { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard';
import Gallery from './Gallery'
// import './App.css';

function App() {
  const [curScore, setCurScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [correctTries, setCorrectTries] = useState([]);

  useEffect(() => {
    fetchChars();
  }, [])

  const fetchChars = async () => {
    const maxPages = 42;
    const randomPage = Math.floor(Math.random() * maxPages) + 1;
    const url = 'https://rickandmortyapi.com/api/character?page=' + randomPage;
    try {
      const response = await fetch(url);
      const json = await response.json();
      setCharacters(json.results);

    } catch (error) {
      console.log("error", error);
    }
  };

  const handleImageClick = (event) => {
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

  //get random sample of a particular size
  const gallerySize = 12;
  const galleryChars = shuffle([...characters]).slice(0, gallerySize);

  return (
    <div>
      <Scoreboard curScore={curScore} bestScore={bestScore}></Scoreboard>
      <Gallery handleClick={handleImageClick} characters={galleryChars}></Gallery>
    </div>
  );
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default App;