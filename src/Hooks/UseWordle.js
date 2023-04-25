import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); //{a: 'green', b: 'yellow'}

  // 1- format a guess into an array of letter object
  // e.g [{key:'a', color:'yellow'}]

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });

    // find any green letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  // 2- add a new guess to the guess state
  // update the is correct state if the guess is correct
  // add one to the turn state

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((previuosGuess) => {
      let newGuess = [...previuosGuess];
      newGuess[turn] = formattedGuess;
      return newGuess;
    });

    setHistory((previousHistory) => {
      return [...previousHistory, +currentGuess];
    });

    setTurn((previousTurn) => {
      return previousTurn + 1;
    });

    setUsedKeys((previousUsedKeys) => {
      let newKeys = { ...previousUsedKeys };

      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key];

        if (l.color == "green") {
          newKeys[l.key] = "green";
          return;
        }
        if (l.color == "yellow" && currentColor != "green") {
          newKeys[l.key] = "yellow";
          return;
        }
        if (
          l.color == "grey" &&
          currentColor != "green" &&
          currentColor != "yellow"
        ) {
          newKeys[l.key] = "grey";
          return;
        }
      });
      return newKeys;
    });

    setCurrentGuess("");
  };

  //   3 handle keyup event and track current guesss
  // if user presses enter, add new guess

  const handleKeyup = ({ key }) => {
    if (key == "Enter") {
      // only add guess if turn is less than 5

      if (turn > 5) {
        console.log("you are done");
        return;
      }

      // do not allow duplicate word

      if (history.includes(currentGuess)) {
        console.log("word alreaady used");
        return;
      }

      // check word is 5 char long

      if (currentGuess.length !== 5) {
        console.log("word not enough");
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key == "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, usedKeys, handleKeyup, isCorrect };
};

export default useWordle;
