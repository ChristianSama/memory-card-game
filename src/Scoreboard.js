function Scoreboard(props) {
  return (
    <div>
      <h2>Current Score: {props.curScore}</h2>
      <h2>Best Score: {props.bestScore}</h2>
    </div>
  );
}

export default Scoreboard;