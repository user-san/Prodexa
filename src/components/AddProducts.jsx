import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import useFetch from "./custom_hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./AddProducts.css";
import { ThreeDot } from "react-loading-indicators";
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
  const [loading, setLoading] = useState(false);
  const { products } = useFetch(
    "https://my-products-db-server.onrender.com/products"
  );

  let handleAdd = (e) => {
    e.preventDefault();
    // console.log(finalValues);
    // console.log(products);
    let normalize = (str) => str.trim().replace(/\s+/g, " ").toLowerCase();

    let duplicate = products.some(
      (product) => normalize(product.title) == normalize(finalValues.title)
    );
    // console.log(duplicate);
    if (
      newValues.title === "" ||
      newValues.price === "" ||
      newValues.description === "" ||
      newValues.rating.rate === "" ||
      newValues.rating.count === ""
    ) {
      alert("Please fill all the details!");
    } else if (duplicate) {
      alert("NO DUPLICATE: Product already Available!");
    } else {
      setLoading(true);
      fetch("https://my-products-db-server.onrender.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalValues),
      }).then(() => {
        setLoading(false);
        setTimeout(() => {
          alert("Data Added Successfully!");
          setNewValues({
            title: "",
            price: "",
            description: "",
            category: "",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating: { rate: "", count: "" },
          });
        }, 100);
      });
    }
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
    <div style={{ position: "relative" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
      )}

      <div>
        <Paper elevation={20} className="AddProductMain">
          <Typography
            sx={{
              mb: 2,
              textAlign: "center",
              fontSize: { xs: "18px", sm: "26px", md: "30px" },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            Add Product
            <Button
              sx={{
                fontSize: { xs: "12px", sm: "14px" },
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
            style={{ display: "grid", gap: "12px" }}
          >
            <TextField
              name="title"
              label="Title"
              variant="outlined"
              fullWidth
              inputProps={{
                maxLength: 70,
              }}
              InputProps={{
                sx: {
                  "& .MuiInputBase-input": {
                    padding: {
                      xs: "6px 10px", // reduced padding on mobile
                      sm: "16.5px 14px", // default on larger screens
                    },
                    fontSize: {
                      xs: "14px",
                      sm: "16px",
                    },
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: {
                    xs: "14px",
                    sm: "18px",
                  },
                  transform: {
                    xs: "translate(20px, 7px) scale(1)", // normal state
                    sm: "translate(14px, 16.5px) scale(1)",
                  },
                  "&.MuiInputLabel-shrink": {
                    transform: {
                      xs: "translate(20px, -9px) scale(0.75)", // when floating
                      sm: "translate(18px, -9px) scale(0.75)",
                    },
                  },
                },
              }}
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
              sx={{
                fontSize: { xs: "10px", sm: "12px", md: "14px" },
                textAlign: "end",
              }}
            >
              Max Characters {newValues.title.length}/70
            </Typography>
            <TextField
              inputRef={descriptionRef}
              name="description"
              label="Description"
              multiline
              maxRows={4}
              className="custom-multiline-textfield"
              InputProps={{
                sx: {
                  "& .MuiInputBase-input": {
                    padding: {
                      xs: "6px 10px", // reduced padding on mobile
                      sm: "16.5px 14px", // default on larger screens
                    },
                    fontSize: {
                      xs: "14px",
                      sm: "16px",
                    },
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: {
                    xs: "14px",
                    sm: "18px",
                  },
                  transform: {
                    xs: "translate(20px, 7px) scale(1)", // normal state
                    sm: "translate(14px, 16.5px) scale(1)",
                  },
                  "&.MuiInputLabel-shrink": {
                    transform: {
                      xs: "translate(20px, -9px) scale(0.75)", // when floating
                      sm: "translate(22px, -9px) scale(0.75)",
                    },
                  },
                },
              }}
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
              InputProps={{
                sx: {
                  "& .MuiInputBase-input": {
                    padding: {
                      xs: "6px 10px", // reduced padding on mobile
                      sm: "16.5px 14px", // default on larger screens
                    },
                    fontSize: {
                      xs: "14px",
                      sm: "16px",
                    },
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: {
                    xs: "14px",
                    sm: "18px",
                  },
                  transform: {
                    xs: "translate(20px, 7px) scale(1)", // normal state
                    sm: "translate(14px, 16.5px) scale(1)",
                  },
                  "&.MuiInputLabel-shrink": {
                    transform: {
                      xs: "translate(20px, -9px) scale(0.75)", // when floating
                      sm: "translate(18px, -9px) scale(0.75)",
                    },
                  },
                },
              }}
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
                  InputProps={{
                    sx: {
                      "& .MuiInputBase-input": {
                        padding: {
                          xs: "6px 10px", // reduced padding on mobile
                          sm: "16.5px 14px", // default on larger screens
                        },
                        fontSize: {
                          xs: "14px",
                          sm: "16px",
                        },
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: {
                        xs: "14px",
                        sm: "18px",
                      },
                      transform: {
                        xs: "translate(20px, 7px) scale(1)", // normal state
                        sm: "translate(14px, 16.5px) scale(1)",
                      },
                      "&.MuiInputLabel-shrink": {
                        transform: {
                          xs: "translate(20px, -9px) scale(0.75)", // when floating
                          sm: "translate(18px, -9px) scale(0.75)",
                        },
                      },
                    },
                  }}
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
                  InputProps={{
                    sx: {
                      "& .MuiInputBase-input": {
                        padding: {
                          xs: "6px 10px", // reduced padding on mobile
                          sm: "16.5px 14px", // default on larger screens
                        },
                        fontSize: {
                          xs: "14px",
                          sm: "16px",
                        },
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: {
                        xs: "14px",
                        sm: "18px",
                      },
                      transform: {
                        xs: "translate(20px, 7px) scale(1)", // normal state
                        sm: "translate(14px, 16.5px) scale(1)",
                      },
                      "&.MuiInputLabel-shrink": {
                        transform: {
                          xs: "translate(20px, -9px) scale(0.75)", // when floating
                          sm: "translate(18px, -9px) scale(0.75)",
                        },
                      },
                    },
                  }}
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
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                py: { xs: 0.2, sm: 0.5 },
              }}
            >
              Add
            </Button>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default AddProducts;
