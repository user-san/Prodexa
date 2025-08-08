import useFetch from "./custom_hooks/useFetch";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { ThreeDot } from "react-loading-indicators";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import axios from "axios";
import Swal from "sweetalert2";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../Store/cartSlice";

//!BootstrapTooltip using material ui
export const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.gray,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.gray,
  },
}));

//?main function
const Products = () => {
  let { products, setProducts, error, loading } = useFetch(
    "https://my-products-db-server.onrender.com/products"
  );
  const location = useLocation();

  const focusId = location.state?.focusId;

  const productRef = useRef({});

  //?for ScrollFocus()
  useEffect(() => {
    if (!focusId || products.length === 0) return;

    let attempt = 0;

    const interval = setInterval(() => {
      const element = productRef.current[focusId];
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        element.style.boxShadow = "0 0 0 10px #0c8c9aa9";
        element.style.scrollMarginTop = "80px";

        setTimeout(() => {
          if (element) element.style.boxShadow = "";
        }, 3000);

        clearInterval(interval); //successfull scroll
      }

      if (++attempt > 20) {
        clearInterval(interval); // failure scroll
      }
    }, 100);

    return () => clearInterval(interval); // clean up function (used whenever we use asyncronous methods in a useEffect, then only it will stop the ongoing async task and run freshly for new dependency changes )
  }, [focusId, products]);

  const navigate = useNavigate();
  const [deleteloading, setDeleteloading] = useState(false);

  //?for delete
  function handelDeleteProducts(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      scrollbarPadding: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      backdrop: "rgba(0, 0, 0, 0.45)",

      customClass: {
        popup: "my-swal-popup",
        title: "my-swal-title",
        confirmButton: "my-swal-confirm",
        cancelButton: "my-swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setDeleteloading(true);
        axios
          .delete(`https://my-products-db-server.onrender.com/products/${id}`)
          .then(() => {
            setDeleteloading(false);
            let confirmed = false;
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted successfully.",
              icon: "success",
              showConfirmButton: true,
              scrollbarPadding: false,
              confirmButtonText: "OK",
              timer: 3000,
              timerProgressBar: true,
              customClass: {
                popup: "my-swal-popup",
                title: "my-swal-title",
                confirmButton: "swal-custom-btn",
              },
              willClose: () => {
                // This runs when the modal closes, even due to timeout
                confirmed = true;
              },
            }).then(() => {
              if (confirmed) {
                setProducts(products.filter((product) => product.id !== id));
              }
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: "Could not delete the product.",
              icon: "error",
              scrollbarPadding: false,
              customClass: {
                popup: "my-swal-popup",
                title: "my-swal-title",
                confirmButton: "swal-custom-btn",
              },
            });
            setDeleteloading(false);
          });
      }
    });
  }

  //?AddToCartFunction
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.Cart);
  let addToCart = (product) => {
    const duplicate = cartProducts.some(
      (cartproduct) => cartproduct.id === product.id
    );
    if (!duplicate) {
      dispatch(addItem(product));
    } else {
      alert("⛔product is already in the Cart!");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <ThreeDot
          variant="bounce"
          color="#0a0a0aff"
          size="small"
          text=""
          textColor=""
          speedPlus="2"
        />
      </div>
    );
  } else {
    return (
      <div style={{ position: "relative" }}>
        {deleteloading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 10,
              backgroundColor: "rgba(0, 0, 0, 0.45)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThreeDot
              variant="bounce"
              color="#000000ff"
              size="small"
              text=""
              textColor=""
              speedPlus="2"
            />
          </div>
        )}
        <div className="productsHeader">
          <h1 className="headerText">Products</h1>
          {!error && (
            <BootstrapTooltip
              title="Click to add new Product"
              placement="top-start"
            >
              <Button
                id="productAddBtn"
                variant="primary"
                onClick={() => navigate("/addproducts")}
              >
                Add
                <PlaylistAddRoundedIcon />
              </Button>
            </BootstrapTooltip>
          )}
        </div>

        {products.length !== 0 && (
          <section className="productSection">
            {products.map((product) => {
              return (
                <Card
                  ref={(element) => (productRef.current[product.id] = element)}
                  key={product.id}
                  style={{
                    width: "18rem",
                    border: focusId === product.id ? "2px solid green" : "",
                    scrollMarginTop: "80px",
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
                      <BootstrapTooltip title="Edit" placement="top">
                        <Button
                          className="productBtn productEditBtn"
                          variant="primary"
                          onClick={() =>
                            navigate(`/editproducts/${product.id}`)
                          }
                        >
                          <DriveFileRenameOutlineRoundedIcon />
                        </Button>
                      </BootstrapTooltip>
                      <BootstrapTooltip title="Add to Cart" placement="top">
                        <Button
                          className="productBtn pbtn"
                          variant="primary"
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCartRoundedIcon />
                        </Button>
                      </BootstrapTooltip>
                    </div>
                  </Card.Footer>
                </Card>
              );
            })}
          </section>
        )}

        {error && (
          <center>
            <p>{error}...</p>
          </center>
        )}
      </div>
    );
  }
};

export default Products;
