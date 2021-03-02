import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Navbar, Products, Cart } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };
  const fatchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddTooCart = async (productId, quanitiy) => {
    const item = await commerce.cart.add(productId, quanitiy);

    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fatchCart();
  }, []);
  console.log(cart);
  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddTooCart} />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
