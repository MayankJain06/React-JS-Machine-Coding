import { useState } from "react";

const Timer = () => {
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleStartTimer = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  const handleStopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleResetTimer = () => {
    handleStopTimer();
    setTimer(0);
  };

  return (
    <div>
      <h1>Timer : {timer}</h1>
      <button onClick={handleStartTimer}>Start</button>
      <button onClick={handleStopTimer}>Stop</button>
      <button onClick={handleResetTimer}>Reset</button>
    </div>
  );
};

export default Timer;
