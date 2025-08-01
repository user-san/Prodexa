import useFetch from "./custom_hooks/useFetch";
const Home = () => {
  let { products } = useFetch(
    "https://my-products-db-server.onrender.com/products"
  );
  return (
    <div>
      <h1>Home-{products.length}</h1>
    </div>
  );
};

export default Home;
