import { useContext } from "react";
import { CounterContext } from "./CounterContext";

const CounterComponent = () => {
  const { counter, Increment, Decrement, Reset } = useContext(CounterContext);
  return (
    <div>
      <h1>Count: {counter}</h1>
      <button onClick={Increment}>Increment</button>
      <button onClick={Decrement}>Decrement</button>
      <button onClick={Reset}>Reset</button>
    </div>
  );
};

export default CounterComponent;
