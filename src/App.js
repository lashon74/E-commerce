import React,{useState, useEffect} from "react";
import { commerce } from "./lib/commerce";
import { Navbar, Products } from "./components";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({})

  const fetchProducts = async () => {
    const {data} = await commerce.products.list();

    setProducts(data);
  }
  const fatchCart = async () => {
    const cart = await commerce.cart.retrieve();

    setCart(cart);
  }

  useEffect(() => {
    fetchProducts();
    fatchCart();
  }, [])

  return (
    <div>
      <h1>E-commerce</h1>
      <Navbar />
      <Products products={products}/>
    </div>
  );
};

export default App;
