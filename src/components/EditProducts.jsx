import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useFetch from "./custom_hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditProducts.css";
import { ThreeDot } from "react-loading-indicators";
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

  const initialProductDetails = useRef(null); //used to compare if any changes made

  const [updateProduct, setUpdateProducts] = useState(null); //state moitor input data and display the product want to edit

  //?getting the clicked product
  useEffect(() => {
    axios
      .get(`https://my-products-db-server.onrender.com/products/${id}`)
      .then((res) => {
        initialProductDetails.current = res.data;
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

  //!getting the product using custom hook that has API getRequest
  const { products, loading, setLoading } = useFetch(
    "https://my-products-db-server.onrender.com/products"
  ); //for comparing

  let handleUpdate = async (e) => {
    e.preventDefault();

    let duplicate = products.some(
      (product) =>
        product.id.toString() !== id.toString() &&
        product.title.trim().toLowerCase() ===
          updateProduct.title.trim().toLowerCase()
    );
    if (
      JSON.stringify(updateProduct) ===
      JSON.stringify(initialProductDetails.current)
    ) {
      alert("ℹ️ You Changed Nothing!");
      navigate("/products", { state: { focusId: id } });
      return;
    }

    if (duplicate) {
      alert("❌ Product Title already exists!");
      return;
    }

    if (
      !updateProduct.title.trim() ||
      !updateProduct.price ||
      !updateProduct.description.trim() ||
      !updateProduct.rating.rate ||
      !updateProduct.rating.count
    ) {
      alert("⚠️Please fill all the details!");
      return;
    }

    try {
      setLoading(true);
      await fetch(`https://my-products-db-server.onrender.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateProduct),
      });
      alert("✅ Product Edited Successfully!");
      navigate("/products", { state: { focusId: id } });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to update product!");
    } finally {
      setLoading(false);
    }
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

  // console.log(loading);
  if (loading || updateProduct === null) {
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
      <div>
        <Paper elevation={20} className="EditProductMain">
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
            Edit Product
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
              onClick={() => navigate("/products", { state: { focusId: id } })}
            >
              Back
            </Button>
          </Typography>
          <Grid
            component="form"
            onSubmit={handleUpdate}
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
              sx={{
                fontSize: { xs: "10px", sm: "12px", md: "14px" },
                textAlign: "end",
              }}
            >
              Max Characters {updateProduct.title.length}/70
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
                    fontSize: {
                      xs: "14px",
                      sm: "16px",
                    },
                    lineHeight: {
                      xs: "1.2rem", // smaller line spacing on mobile
                      sm: "1.5rem",
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
                  value={updateProduct.rating.count}
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
              Change
            </Button>
          </Grid>
        </Paper>
      </div>
    );
  }
};

export default EditProducts;
