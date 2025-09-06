import { useState } from "react";

function Cell({ value, onChange, inputRef, onKeyDown, isActive, result, position }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value.toUpperCase();
    if (newValue && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 150);
    }
    onChange(e);
  };

  const getCellStyles = () => {
    if (!result || !result.green || !result.yellow) {
      return {
        background: "bg-white",
        border: value ? "border-gray-700" : "border-gray-300",
        text: "text-gray-800",
      };
    }
    if (result.green[position]) {
      return { background: "bg-green-500", border: "border-green-500", text: "text-white" };
    } else if (result.yellow[position]) {
      return { background: "bg-yellow-500", border: "border-yellow-500", text: "text-white" };
    } else {
      return { background: "bg-gray-500", border: "border-gray-500", text: "text-white" };
    }
  };

  const styles = getCellStyles();

  return (
    <input
      ref={inputRef}
      type="text"
      maxLength={1}
      value={value}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      disabled={!isActive}
      className={`w-14 h-14 text-center text-3xl font-bold ${styles.background} ${styles.text} border-2 ${styles.border} rounded-lg uppercase focus:outline-none transition-all duration-300 ease-in-out caret-black ${isAnimating ? "scale-110" : "scale-100"} ${!isActive ? "cursor-not-allowed" : ""} ${isActive && !result ? "hover:border-gray-400 focus:border-black focus:ring-2 focus:ring-blue-200" : ""}`}
    />
  );
}

export default Cell;
