import Products from "./components/Products";
import Home from "./components/Home";
import Login from "./components/Login";
import Counter from "./components/Counter";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AddProducts from "./components/AddProducts";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import EditProducts from "./components/EditProducts";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/:newUser" element={<Login />} />
            {/*sending user as parameter*/}
            <Route path="/products" element={<Products />} />
            <Route path="/addproducts" element={<AddProducts />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/editproducts/:id" element={<EditProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
export default App;
