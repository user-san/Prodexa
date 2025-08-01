import Header from "./components/Header";
import ToDoApp from "./components/ToDoApp";
import Products from "./components/Products";
import Home from "./components/Home";
import Login from "./components/Login";
import Counter from "./components/Counter";
import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProducts from "./components/AddProducts";
import MyNavbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import EditProducts from "./components/EditProducts";

export const ProductContext = createContext();
export const ToDoList = createContext();

function App() {
  const [list, setList] = useState([
    { id: 1, text: "HTML & CSS", checked: true },
    { id: 2, text: "Java Script", checked: true },
    { id: 3, text: "React", checked: false },
  ]);

  //list of products
  const [products, setProduct] = useState([
    {
      name: "Xiaomi",
      model: "15",
      price: 65000,
      offer() {
        return this.price - 0.05 * this.price;
      },
    },
    {
      name: "Samsung",
      model: "S25ULTRA",
      price: 118000,
      offer() {
        return this.price - 0.15 * this.price;
      },
    },
    {
      name: "Vivo",
      model: "X200FE",
      price: 60000,
      offer() {
        return this.price - 0.03 * this.price;
      },
    },
  ]);

  const user = "Sandy";

  return (
    <>
      <ProductContext.Provider value={{ products, setProduct }}>
        <ToDoList.Provider value={{ list, setList }}>
          <Router>
            <MyNavbar />
            <div className="main">
              <Routes>
                <Route path="/Products_Listing/" element={<Home />} />
                <Route path="/login/:newUser" element={<Login />} />
                {/*receiving user as parameter*/}
                <Route path="/todoapp" element={<ToDoApp />} />
                <Route path="/products" element={<Products />} />
                <Route path="products/productlist" element={<ProductList />} />
                <Route path="/addproducts" element={<AddProducts />} />
                <Route path="/counter" element={<Counter />} />
                <Route path="/editproducts/:id" element={<EditProducts />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </ToDoList.Provider>
      </ProductContext.Provider>
    </>
  );
}
export default App;
