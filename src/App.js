import { useState } from 'react';
import Scoreboard from './Components/Scoreboard';
import Gallery from './Components/Gallery';
import Modal from './Components/Modal';
import './css/App.css';

function App() {
  const [curScore, setCurScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [correctTries, setCorrectTries] = useState([]);

  const restartGame = (event) => {
    setCurScore(0);
    // getChars();
  }

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
      <Scoreboard curScore={curScore} bestScore={bestScore}></Scoreboard>
      <Gallery handleClick={handleImageClick}></Gallery>
      <Modal></Modal>
    </div>
  );
}

export default App;