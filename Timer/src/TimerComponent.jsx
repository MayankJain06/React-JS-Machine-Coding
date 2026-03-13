import { useState, useRef } from "react";

const TimerComponent = () => {
  const [timer, setTimer] = useState(0);
  const id = useRef(null);

  const handleStartTimer = () => {
    id.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const handleStopTimer = () => {
    clearInterval(id.current);
  };

  const handleResetTimer = () => {
    handleStopTimer();
    setTimer(0);
  };

  return (
    <div>
      <h1>Timer using useRef: {timer}</h1>
      <button onClick={handleStartTimer}>Start</button>
      <button onClick={handleStopTimer}>Stop</button>
      <button onClick={handleResetTimer}>Reset</button>
    </div>
  );
};

export default TimerComponent;
