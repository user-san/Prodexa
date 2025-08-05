import { useEffect, useState } from "react";
import useFetch from "./custom_hooks/useFetch";
import { ThreeDot } from "react-loading-indicators";
import "./Home.css";

const Home = () => {
  let { products } = useFetch(
    "https://my-products-db-server.onrender.com/products"
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  return (
    <div className="Home-main">
      <pre style={{ fontSize: "60px" }}>Home</pre>
      <p>
        Total Products{" =>"}
        {loading ? (
          <span className="homeLoading">
            <ThreeDot
              color="#000000ff"
              size="small"
              text=""
              textColor=""
              speedPlus="2"
            />
          </span>
        ) : (
          <span className="homeLoading">{products.length}</span>
        )}{" "}
      </p>
      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
          paddingInline:"40px",
          fontSize: "14px",
          fontStyle: "italic",
          color: "#555",
        }}
      >
        ⏳ Occasionally, data may take a few seconds to load from the server. If
        it seems slow, please wait or try refreshing.
      </p>
      <div className="project-status-card">
        <h2>🚧 Currently Building This Project</h2>
        <p>
          Hey there! 👋 I'm actively working on this product listing app. Here's
          the current progress:
        </p>

        <div className="status-section">
          <h3>✅ Completed Components</h3>
          <ul>
            <li>🛒 Product Listing Page with real-time data from API</li>
            <li>
              ➕ Add Product – <b>Create</b> operation
            </li>
            <li>
              📝 Edit Product – <b>Update</b> operation
            </li>
            <li>
              🗑️ Delete Product – <b>Delete</b> operation
            </li>
            <li>
              📦 All products fetched via API – <b>Read</b> operation
            </li>
            <li>🔢 Simple Counter (UI Component)</li>
          </ul>
          <h3>🔮 In Progress</h3>
          <ul>
            <li>🧑‍💻 Authentication System</li>
            <li>📦 Cart Functionality</li>
            <li>➕ More Add & Edit Product Properties </li>
            <li>📊 Admin Dashboard</li>
          </ul>
        </div>

        <p style={{ fontStyle: "italic", color: "#666" }}>
          Follow my progress on GitHub or check back soon for updates!
        </p>
      </div>
    </div>
  );
};

export default Home;
