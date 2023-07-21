import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import Home from './components/pages/Home';
import NavBar from './components/views/NavBar';
import Products from './components/pages/Products';
import Product from './components/pages/Product';
import Cart from './components/pages/Cart';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/product/:id' element={<Product/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
    </>
  );
}

export default App;
