import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useFetch from "./custom_hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const EditProducts = () => {
  //?ref for click enter to focus next textbox
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const rateRef = useRef(null);
  const countRef = useRef(null);

  //!navigate
  const navigate = useNavigate();

  //!reciving parameter
  const { id } = useParams();

  const intitialProductDetails = useRef(null); //used to compare if any changes made

  const [updateProduct, setUpdateProducts] = useState(null); //state moitor input data and display the product want to edit

  //?getting the clicked product
  useEffect(() => {
    axios
      .get(`https://my-products-db-server.onrender.com/products/${id}`)
      .then((res) => {
        intitialProductDetails.current = res.data;
        setUpdateProducts(res.data); // display it to textbox using handel input function
      });
  }, [id]);

  //   console.log(updateProduct);

  //?display and update the data changes in the inputtext
  let handleInputs = function (e) {
    let { name, value } = e.target;
    let fieldName = name.split("rating.");

    if (name.includes("rating")) {
      setUpdateProducts({
        ...updateProduct,
        rating: { ...updateProduct.rating, [fieldName[1]]: value },
      });
    } else {
      setUpdateProducts({
        ...updateProduct,
        [name]: value,
      });
    }
  };

  //!getting the product using custom hook that has API getReques
  const { products } = useFetch(
    "https://my-products-db-server.onrender.com/products"
  ); //for comparing

  let handleUpdate = (e) => {
    e.preventDefault();
    let duplicate = products.some(
      (product) => product.id !== id && product.title === updateProduct.title //prints false only if the product.id is equal to the clicked product id
    );

    if (duplicate) {
      alert("❌NO DUPLICATE: Product Title already Available!");
    } else if (
      updateProduct.title === "" ||
      updateProduct.price === "" ||
      updateProduct.description === "" ||
      updateProduct.rating.rate === "" ||
      updateProduct.rating.count === ""
    ) {
      alert("⚠️Please fill all the details!");
    } else if (
      JSON.stringify(updateProduct) ===
      JSON.stringify(intitialProductDetails.current)
    ) {
      alert("ℹ️ You Changed Nothing!");
      navigate("/products", { state: { focusId: id } });
    } else {
      fetch(`https://my-products-db-server.onrender.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateProduct),
      }).then(() => {
        alert("✅Product Edited Successfully!");
        navigate("/products", { state: { focusId: id } }); //navigate with loction State or navigate State (an alternate for URL/${} parameter pass)
      });
    }
  };

  //Styles for paper Component
  let paperStyle = {
    padding: "20px",
    paddingInline: "35px",
    width: "auto",
    margin: "20px 20px",
    borderRadius: "10px",
    background: "linear-gradient(to right, #5454546d, #ffffffff, #b8b7b79a)",
  };

  //!function to remove the counterBar in the number textBox
  function textBoxNoSpinner() {
    return {
      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
        {
          WebkitAppearance: "none",
          margin: 0,
        },
      "& input[type=number]": {
        MozAppearance: "textfield",
      },
    };
  }

  //!renders the componets only if the monitering state(updateProduct) not equal to null because we store initial value as null in declaration
  if (updateProduct !== null) {
    return (
      <div>
        <Paper elevation={20} style={paperStyle}>
          <Typography
            style={{
              marginBottom: "20px",
              textAlign: "center",
              fontSize: "30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Edit Product
            <Button
              sx={{
                fontSize: "14px",
                height: "30px",
                color: "black",
                "&:hover": {
                  backgroundColor: "#757171ff",
                  boxShadow: "none",
                },
              }}
              onClick={() => navigate("/products", { state: { focusId: id } })}
            >
              Back
            </Button>
          </Typography>
          <Grid
            component="form"
            onSubmit={handleUpdate}
            style={{ display: "grid", gap: "20px" }}
          >
            <TextField
              name="title"
              label="Title"
              variant="outlined"
              fullWidth
              inputProps={{ maxLength: "70" }}
              // slotProps={{
              //   input: { maxLength: 50 },
              // }}
              value={updateProduct.title}
              onChange={handleInputs}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  descriptionRef.current?.focus();
                }
              }}
            />
            <Typography
              variant="caption"
              color="textSecondary"
              style={{ textAlign: "end" }}
            >
              Max Characters {updateProduct.title.length}/70
            </Typography>

            <TextField
              inputRef={descriptionRef}
              name="description"
              label="Description"
              multiline
              maxRows={4}
              fullWidth
              value={updateProduct.description}
              onChange={handleInputs}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  priceRef.current?.focus();
                }
              }}
            />

            <TextField
              inputRef={priceRef}
              name="price"
              label="Price"
              type="number"
              variant="outlined"
              fullWidth
              className="custom-number"
              sx={textBoxNoSpinner}
              value={updateProduct.price}
              onChange={handleInputs}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  rateRef.current?.focus();
                }
              }}
            />
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  inputRef={rateRef}
                  name="rating.rate"
                  type="number"
                  label="Rate"
                  variant="outlined"
                  sx={textBoxNoSpinner}
                  value={updateProduct.rating.rate}
                  onChange={handleInputs}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      countRef.current?.focus();
                    }
                  }}
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  inputRef={countRef}
                  name="rating.count"
                  type="number"
                  label="Count"
                  variant="outlined"
                  sx={textBoxNoSpinner}
                  value={updateProduct.rating.count}
                  onChange={handleInputs}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{ marginBottom: "15px" }}
            >
              Change
            </Button>
          </Grid>
        </Paper>
      </div>
    );
  }
};

export default EditProducts;
