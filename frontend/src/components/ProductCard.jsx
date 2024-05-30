import React, { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import './ProductCard.css'; // Link the CSS file

const baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = baseURL;

const ProductCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(props.product);
  const [token, setToken] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const amountInputRef = useRef();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setIsAdmin(localStorage.getItem("isAdmin"));
  }, [token]);

  const handleUpdate = (id) => {
    navigate("/update/" + id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/delete/${id}`);
      if (response.data === "Product deleted!") {
        props.getProduct();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddToCart = (product) => {
    const product_item = {
      product: product,
      amount: amountInputRef.current.value,
    };
    dispatch(addToCart(product_item));
  };

  return (
    <Card className="product-card">
      <CardHeader title={product.title} className="product-card-header" />
      <CardMedia
        component="img"
        image={product.images}
        alt="Product image"
      />
      <CardContent className="card-content">
        <Stack direction="column" spacing={1}>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Rating
              name="half-rating-read"
              defaultValue={product.rating}
              precision={0.5}
              readOnly
              className="rating-stars"
            />
            <Typography variant="body1" color="text.primary">
              {product.rating}
            </Typography>
          </Stack>
          <Typography variant="body1" color="text.primary" className="price">
            {product.price} $
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price discount: {product.discountPercentage}%
          </Typography>
        </Stack>
      </CardContent>
      <CardActions className="card-actions">
        {token && isAdmin ? (
          <Stack direction="row" gap={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleUpdate(product._id)}
            >
              Update
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </Button>
          </Stack>
        ) : (
          <Stack direction="row" spacing={2} alignItems="center">
            <button
              className="add-button"
              onClick={() => handleAddToCart(product)}
            >
              + Add
            </button>
            <input
              ref={amountInputRef}
              className="amount-input"
              type="number"
              min={1}
              max={5}
              step={1}
              defaultValue={1}
            />
          </Stack>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
