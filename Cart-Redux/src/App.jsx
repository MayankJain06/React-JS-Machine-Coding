import './App.css'
import Cart from './Components/Cart';
import ProductList  from './Components/ProductList';
import { store } from './app/store';
import { Provider } from 'react-redux';

function App() {
 
  return (
    <>
    <Provider store={store}>
   <h1>This 
    is the Shopping Cart Application</h1>
   <ProductList />
   <Cart />
   </Provider>
   </>
  )
}

export default App;
