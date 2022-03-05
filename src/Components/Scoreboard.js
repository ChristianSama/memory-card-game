import '../css/Scoreboard.css';

function Scoreboard(props) {
  const showModal = () => {
    const modal = document.querySelector('.modal');
    modal.style.display = "block";
  }

  return (
    <div className="board">
      <div className="score">
        <h2>Current Score: {props.curScore}</h2>
        <h2>Best Score: {props.bestScore}</h2>
      </div>
      <div className="buttons">
        <button className="help" onClick={showModal}>Help</button>
        <button className="restart" onClick={props.restartGame}>Restart</button>
      </div>
    </div>
  );
}

export default Scoreboard;