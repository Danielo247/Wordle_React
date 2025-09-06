import React, { useState, useEffect } from "react";
import File from "./components/File";
import spainFlag from "./assets/spain.png";
import usaFlag from "./assets/usa.png";

export default function App() {
  const maxAttempts = 6;
  const [language, setLanguage] = useState(null);
  const [wordLength, setWordLength] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [results, setResults] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (language) initializeGame();
  }, [language]);

  if (!language) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <button onClick={() => setLanguage('es')} className="p-2 hover:scale-110 transition-transform cursor-pointer">
              <img src={spainFlag} className="w-22 h-22" />
            </button>
            <button onClick={() => setLanguage('en')} className="p-2 hover:scale-110 transition-transform cursor-pointer">
              <img src={usaFlag} className="w-22 h-22" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const initializeGame = () => {
    fetch(`http://localhost:8080/api/wordle/prepare?lang=${language}`, { method: "POST" })
      .then((res) => res.json())
      .then((len) => {
        setWordLength(len);
        setAttempts(Array.from({ length: maxAttempts }, () => Array(len).fill("")));
        setResults(Array.from({ length: maxAttempts }, () => null));
        setCurrentRow(0);
        setGameFinished(false);
        setMessage("");
      })
      .catch((err) => {
        console.error("Error getting word length:", err);
      });
  };

  const updateAttempt = (row, newAttempt) => {
    if (gameFinished || row !== currentRow) return;
    const newAttempts = [...attempts];
    newAttempts[row] = newAttempt;
    setAttempts(newAttempts);
  };

  const submitAttempt = async (attempt) => {
    if (gameFinished) return;
    const word = attempt.join("").trim();

    try {
      const response = await fetch(
        `http://localhost:8080/api/wordle/tr?tr=${word}`,
        { method: "POST" }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Received result:", result);

      const newResults = [...results];
      newResults[currentRow] = result;
      setResults(newResults);

      const won = result.green.every((v) => v === true);

      if (won) {
        setGameFinished(true);
        setMessage("Congratulations!");
        setTimeout(() => {
          initializeGame();
        }, 3000);
      } else if (currentRow >= maxAttempts - 1) {

      const solResponse = await fetch("http://localhost:8080/api/wordle/solution");
      const solution = await solResponse.text();

      setGameFinished(true);
      setMessage(`Game over! The word was: ${solution}`);
      setTimeout(() => {
      initializeGame();
      }, 3000);
      }
      else {
              setCurrentRow((prev) => prev + 1);
            }
          } catch (error) {
            setMessage("⚠️ Error connecting to server");
          }
        };

  if (wordLength === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center text-gray-600">Loading board...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl shadow-purple-300/70 p-6 flex flex-col items-center">

        <h1 className="text-center mt-6 mb-8 text-3xl font-extrabold tracking-[0.4em] text-gray-900 drop-shadow-lg">
          WORDLE
        </h1>

        <div className="flex flex-col gap-3">
          {attempts.map((attempt, row) => (
            <File
              key={row}
              length={wordLength}
              attempt={attempt}
              onAttemptChange={(newAttempt) => updateAttempt(row, newAttempt)}
              onSubmit={submitAttempt}
              isActive={row === currentRow && !gameFinished}
              result={results[row]}
            />
          ))}
        </div>

        {message && (
          <div
            className={`text-center mt-6 p-3 rounded-lg font-semibold ${
              message.includes("Congratulations")
                ? "bg-green-100 text-green-800"
                : message.includes("Error")
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {message}
          </div>
        )}

      </div>
    </div>
  );
}
