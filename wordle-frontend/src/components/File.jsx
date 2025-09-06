import { useRef, useEffect } from "react";
import Cell from "./Cell";

function File({ length, attempt, onAttemptChange, onSubmit, isActive, result }) {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isActive) {
      inputRefs.current[0]?.focus();
    }
  }, [isActive]);

  const handleSubmit = () => {
    if (isActive && attempt.every((cell) => cell.trim() !== "")) {
      onSubmit(attempt);
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, i) => (
        <Cell
          key={i}
          value={attempt[i] || ""}
          inputRef={(el) => (inputRefs.current[i] = el)}
          isActive={isActive}
          result={result}
          position={i}
          onChange={(e) => {
            if (!isActive) return;
            const newAttempt = [...attempt];
            newAttempt[i] = e.target.value.toUpperCase();
            onAttemptChange(newAttempt);
            if (e.target.value && i < length - 1) {
              inputRefs.current[i + 1]?.focus();
            }
          }}
          onKeyDown={(e) => {
            if (!isActive) return;
            if (e.key === "Backspace" && !attempt[i] && i > 0) {
              inputRefs.current[i - 1]?.focus();
            } else if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      ))}
    </div>
  );
}

export default File;
