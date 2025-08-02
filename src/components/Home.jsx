import useFetch from "./custom_hooks/useFetch";
const Home = () => {
  let { products } = useFetch(
    "https://my-products-db-server.onrender.com/products"
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Home</h1>
      {products.length !== 0 && <p>Total Products-{products.length}</p>}
    </div>
  );
};

export default Home;
