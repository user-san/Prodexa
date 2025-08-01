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
import { useEffect, useLayoutEffect, useRef } from "react";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import axios from "axios";
import Swal from "sweetalert2";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";

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
    "http://localhost:4000/products"
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

        element.style.border = "2px solid #0c8c9a";
        element.style.scrollMarginTop = "80px";

        setTimeout(() => {
          if (element) element.style.border = "";
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

  //?for delete
  function handelDeleteProducts(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
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
        axios
          .delete(`http://localhost:4000/products/${id}`)
          .then(() => {
            setProducts(products.filter((product) => product.id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted successfully.",
              icon: "success",
              showConfirmButton: true,
              confirmButtonText: "OK",
              timer: 3000,
              timerProgressBar: true,
              customClass: {
                popup: "my-swal-popup",
                title: "my-swal-title",
                confirmButton: "swal-custom-btn",
              },
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: "Could not delete the product.",
              icon: "error",
            });
            console.error(err);
          });
      }
    });
  }

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
        />
      </div>
    );
  } else {
    return (
      <div>
        <div className="productsHeader">
          <h1>Products</h1>

          <BootstrapTooltip title="Click to add new Product" placement="top-start">
            <Button
              id="productAddBtn"
              variant="primary"
              onClick={() => navigate("/addproducts")}
            >
              Add
              <PlaylistAddRoundedIcon />
            </Button>
          </BootstrapTooltip>
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
                      style={{
                        paddingTop: "50px",
                        width: "120px",
                        height: "200px",
                      }}
                      alt="Product Image"
                    />
                  </center>
                  <Card.Body className="pBody">
                    <Card.Title style={{ fontSize: "18px" }}>
                      <b>{product.title}</b>
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
                        fontSize: "26px",
                      }}
                    >
                      ${product.price}
                    </Card.Text>
                    <BootstrapTooltip title="Delete" placement="top">
                      <Button
                        className="productDeleteBtn"
                        variant="primary"
                        onClick={() => handelDeleteProducts(product.id)}
                      >
                        <DeleteSweepRoundedIcon />
                      </Button>
                    </BootstrapTooltip>
                    <BootstrapTooltip title="Edit" placement="top">
                      <Button
                        className="productEditBtn"
                        variant="primary"
                        onClick={() => navigate(`/editproducts/${product.id}`)}
                      >
                        <DriveFileRenameOutlineRoundedIcon />
                      </Button>
                    </BootstrapTooltip>
                    <BootstrapTooltip title="Add to Cart" placement="top">
                      <Button className="pbtn" variant="primary">
                        <ShoppingCartRoundedIcon />
                      </Button>
                    </BootstrapTooltip>
                  </Card.Footer>
                </Card>
              );
            })}
          </section>
        )}

        {error && (
          <center>
            <p>{error}</p>
          </center>
        )}
      </div>
    );
  }
};

export default Products;
