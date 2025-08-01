import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import useFetch from "./custom_hooks/useFetch";
import { useNavigate } from "react-router-dom";
const AddProducts = () => {
  // {
  //     "id": 1,
  //     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //     "price": 120,
  //     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //     "category": "men's clothing",
  //     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //     "rating": { "rate": 3.9, "count": 120 }
  //   },
  //
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const rateRef = useRef(null);
  const countRef = useRef(null);

  let [newValues, setNewValues] = useState({
    title: "",
    price: "",
    description: "",
    category: "New items",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: "", count: "" },
  });

  let finalValues = {
    ...newValues,
    price: Number(newValues.price),
    rating: {
      rate: Number(newValues.rating.rate),
      count: Number(newValues.rating.count),
    },
  };
  let handleInputs = function (e) {
    let { name, value } = e.target;
    let fieldName = name.split("rating.");

    if (name.includes("rating")) {
      setNewValues({
        ...newValues,
        rating: { ...newValues.rating, [fieldName[1]]: value },
      });
    } else {
      setNewValues({
        ...newValues,
        [name]: value,
      });
    }
  };

  const { products } = useFetch("https://fakestoreapi.com/products");
  let handleAdd = (e) => {
    e.preventDefault();
    let duplicate = products.some(
      (product) => product.title === finalValues.title
    );
    console.log(duplicate);
    if (duplicate) {
      alert("NO DUPLICATE: Product already Available!");
    } else if (
      newValues.title === "" ||
      newValues.price === "" ||
      newValues.description === "" ||
      newValues.rating.rate === "" ||
      newValues.rating.count === ""
    ) {
      alert("Please fill all the details!");
    } else {
      fetch("https://my-products-db-server.onrender.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalValues),
      }).then(() => {
        alert("Data Added Successfully!");
        setNewValues({
          title: "",
          price: "",
          description: "",
          category: "",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          rating: { rate: "", count: "" },
        });
      });
    }
  };

  let paperStyle = {
    padding: "20px",
    paddingInline: "35px",
    width: "auto",
    margin: "20px 20px",
    borderRadius: "10px",
    background: "linear-gradient(to right, #5454546d, #ffffffff, #b8b7b79a)",
  };

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

  const navigate = useNavigate();

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
          Add Product
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
            onClick={() => navigate("/products")}
          >
            Back
          </Button>
        </Typography>
        <Grid
          component="form"
          onSubmit={handleAdd}
          style={{ display: "grid", gap: "20px" }}
        >
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 70 }}
            // slotProps={{
            //   input: { maxLength: 50 },
            // }}
            value={newValues.title}
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
            Max Characters {newValues.title.length}/70
          </Typography>
          <TextField
            inputRef={descriptionRef}
            name="description"
            label="Description"
            multiline
            maxRows={4}
            fullWidth
            value={newValues.description}
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
            value={newValues.price}
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
                value={newValues.rating.rate}
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
                value={newValues.rating.count}
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
            Add
          </Button>
        </Grid>
      </Paper>
    </div>
  );
};

export default AddProducts;
