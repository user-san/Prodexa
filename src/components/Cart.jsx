import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import { BootstrapTooltip } from "./Products";
import cartImg from "../assets/cart.jpg";
import { deleteItem } from "../Store/cartSlice";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
const Cart = () => {
  const cartProducts = useSelector((state) => {
    return state.Cart;
  });

  let dispatch = useDispatch();
  let handelDeleteProducts = (id) => {
    dispatch(deleteItem(id));
  };
  const navigate = useNavigate();
  return (
    <div>
      <div className="cartHeading">
        <h1>Cart</h1>
        <Button className="cartBackBtn" onClick={() => navigate("/products")}>
          Back
        </Button>
      </div>

      {cartProducts.length !== 0 ? (
        <section className="productSection">
          {cartProducts.map((product) => {
            return (
              <Card
                key={product.id}
                style={{
                  width: "18rem",
                }}
                className="products"
              >
                <center>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    className="productImage"
                    alt="Product Image"
                  />
                </center>
                <Card.Body className="pBody">
                  <Card.Title style={{ fontSize: "18px" }}>
                    <b className="productTitle">{product.title}</b>
                  </Card.Title>
                  <Card.Text className="pDiscription">
                    {product.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="pFooter">
                  <Card.Text
                    style={{
                      paddingTop: "20px",
                      paddingLeft: "20px",
                      fontSize: "25px",
                    }}
                    className="productPrice"
                  >
                    ${product.price}
                  </Card.Text>
                  <div className="button-group">
                    <BootstrapTooltip title="Delete" placement="top">
                      <Button
                        className="productBtn productDeleteBtn"
                        variant="primary"
                        onClick={() => handelDeleteProducts(product.id)}
                      >
                        <DeleteSweepRoundedIcon />
                      </Button>
                    </BootstrapTooltip>
                  </div>
                </Card.Footer>
              </Card>
            );
          })}
        </section>
      ) : (
        <div className="emptyWarnning">
          <br />
          <img
            src={cartImg}
            style={{
              width: "10rem",
              borderRadius: "20px",
            }}
            alt="cartImage"
          />
          <br />
          <p>Your Cart is Empty!</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
