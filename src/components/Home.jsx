import useFetch from "./custom_hooks/useFetch";
const Home = () => {
  let { products } = useFetch("http://localhost:4000/products");
  return (
    <div>
      <h1>Home-{products.length}</h1>
    </div>
  );
};

export default Home;
