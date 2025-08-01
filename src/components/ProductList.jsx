import { useContext } from "react";
import { ProductContext } from "../App";

function ProductList() {
  const { products, setProducts } = useContext(ProductContext);
  //list rendering

  return (
    <div  >
      <br />
      <table id="showList">
        <thead>
          <tr>
            <th>NAME</th>
            <th>MODEL</th>
            <th>PRICE</th>
            <th>OFFER</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.model}>
                <td>{product.name}</td>
                <td>{product.model}</td>
                <td>₹{product.price}</td>
                <td>₹{product.offer()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
