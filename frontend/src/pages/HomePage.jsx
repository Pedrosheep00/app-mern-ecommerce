import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Container, Typography, Box } from "@mui/material";
import ProductCard from "../components/ProductCard";
import Carousel from 'react-material-ui-carousel';
import './HomePage.css'; // Create and use this CSS file for additional styling

const baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = baseURL;

const HomePage = () => {
  const [productList, setProductList] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get(`${baseURL}/products`);
      setProductList(response.data);
      setCarouselItems(response.data.slice(0, 5)); // For example, take the first 5 items for the carousel
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container>
        <Box className="carousel-container">
          <Carousel>
            {carouselItems.map((item) => (
              <Box key={item._id} className="carousel-item">
                <img src={item.imageUrl} alt={item.name} className="carousel-image"  />
                <Typography variant="h5" className="carousel-caption" >
                  {item.name}
                </Typography>
              </Box>
            ))}
          </Carousel>
        </Box>
        <Typography variant="h3" className="section-title" color={"#19527C"}>
          The latest. Take a look at what is new right now.
        </Typography>
        <Grid container gap={3} sx={{ paddingTop: 2, paddingLeft: 3 }}>
          {productList.length !== 0 &&
            productList.map((product) => (
              <Grid item key={product._id}>
                <ProductCard
                  key={product._id}
                  product={product}
                  getProduct={() => getProduct()}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
