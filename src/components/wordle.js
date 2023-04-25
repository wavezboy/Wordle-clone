import React, { useEffect, useState } from "react";
import useWordle from "../Hooks/UseWordle";
import Gird from "./Gird";
import Keypad from "./Keypad";
import Modal from "./Modal";

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyup, usedKeys, isCorrect, guesses, turn } =
    useWordle(solution);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    if (turn > 5) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  useEffect(() => {}, [guesses, isCorrect, turn]);

  return (
    <div>
      {/* <div>currentGuess - {currentGuess}</div>
      <div>solutin - {solution}</div> */}
      <Gird currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </div>
  );
}
