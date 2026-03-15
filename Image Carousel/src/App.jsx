import "./App.css";
import CarouselData from "./CarouselData.json";
import Carousel from "./Carousel";

function App() {
  return (
    <div className="App">
      <h1>Image Carousel</h1>
      <Carousel data={CarouselData} />
    </div>
  );
}

export default App;
