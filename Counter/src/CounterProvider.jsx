import { useState } from "react";
import { CounterContext } from "./CounterContext";

export const CounterProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);

  const Increment = () => {
    setCounter(counter + 1);
  };

  const Decrement = () => {
    setCounter(counter - 1);
  };

  const Reset = () => {
    setCounter(0);
  };

  return (
    <CounterContext.Provider value={{ counter, Increment, Decrement, Reset }}>
      {children}
    </CounterContext.Provider>
  );
};
