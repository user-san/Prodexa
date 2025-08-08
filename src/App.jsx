import ToDoApp from "./components/ToDoApp";
import Products from "./components/Products";
import Home from "./components/Home";
import Login from "./components/Login";
import Counter from "./components/Counter";
import { useState, createContext } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

import AddProducts from "./components/AddProducts";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import EditProducts from "./components/EditProducts";
import Cart from "./components/Cart";

export const ToDoList = createContext();

function App() {
  const [list, setList] = useState([
    { id: 1, text: "HTML & CSS", checked: true },
    { id: 2, text: "Java Script", checked: true },
    { id: 3, text: "React", checked: false },
  ]);

  return (
    <>
      <ToDoList.Provider value={{ list, setList }}>
        <Router>
          <Navbar />
          <div className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login/:newUser" element={<Login />} />
              {/*receiving user as parameter*/}
              <Route path="/todoapp" element={<ToDoApp />} />
              <Route path="/products" element={<Products />} />
              <Route path="/addproducts" element={<AddProducts />} />
              <Route path="/counter" element={<Counter />} />
              <Route path="/editproducts/:id" element={<EditProducts />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ToDoList.Provider>
    </>
  );
}
export default App;
