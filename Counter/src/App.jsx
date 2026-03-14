import "./App.css";
// import Counter from "./Counter";
import CounterComponent from "./CounterComponent";
import { CounterProvider } from "./CounterProvider";

function App() {
  return (
    <CounterProvider>
      <div>
        {/* <Counter /> */}
        <CounterComponent />
      </div>
    </CounterProvider>
  );
}

export default App;
