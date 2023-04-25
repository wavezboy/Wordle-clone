import { useState, useEffect } from "react";
import Wordle from "./components/wordle";

const url = "http://localhost:3001/solution";

function App() {
  const [solution, setSolution] = useState(null);
  useEffect(async () => {
    const response = await fetch(url);
    const solutions = await response.json();
    const randomSolution =
      solutions[Math.floor(Math.random() * solutions.length)];
    setSolution(randomSolution.word);
  }, [setSolution]);

  return (
    <div className="App">
      <div className="content">
        <h1>wordle [LINGO]</h1>
        <div>{solution && <Wordle solution={solution} />}</div>
      </div>
    </div>
  );
}

export default App;
