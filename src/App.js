import { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard';
import Gallery from './Gallery'

function App() {
  const [curScore, setCurScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [correctTries, setCorrectTries] = useState([]);

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

  return (
    <div>
      <Scoreboard curScore={curScore} bestScore={bestScore}></Scoreboard>
      <Gallery handleClick={handleImageClick} characters={characters}></Gallery>
    </div>
  );
}

export default App;