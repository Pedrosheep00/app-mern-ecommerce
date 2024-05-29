import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductScreen from './pages/ProductScreen';
import RequiredAuth from "./util/authRoutes";

import AddProductPage from "./pages/AddProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import AuthPage from "./pages/AuthPage";

import CartPage from "./pages/CartPage";
import cartReducer from "./store/cart/cartReducer";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { AuthContext } from "./context/authContext";
import { useState } from "react";
import AdminPage from "./pages/AdminPage";
import OrdersPage from "./pages/OrdersPage";

const store = configureStore({
  reducer: {
    cartStore: cartReducer,
  },
});

function App() {
  const [userLoggedData, setUserLoggedData] = useState({
    token: null,
    userId: null,
    isAdmin: false,
  });

  const login = (token, userId, isAdmin) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    setUserLoggedData({ token: token, userId: userId, isAdmin: isAdmin });
  };

  const logout = () => {
    setUserLoggedData({ token: null, userId: null, isAdmin: false });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          token: userLoggedData.token,
          userId: userLoggedData.userId,
          isAdmin: userLoggedData.isAdmin,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          <Header />
          <main className="py-3">
            <Container>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/product/:id" element={<ProductScreen />} />
                {/* protected views*/}
                <Route
                  path="/addProduct"
                  element={
                    <RequiredAuth>
                      <AddProductPage />
                    </RequiredAuth>
                  }
                />
                <Route
                  path="/update/:id"
                  element={
                    <RequiredAuth>
                      <UpdateProductPage />
                    </RequiredAuth>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <RequiredAuth>
                      <AdminPage />
                    </RequiredAuth>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <RequiredAuth>
                      <OrdersPage />
                    </RequiredAuth>
                  }
                />
              </Routes>
            </Container>
          </main>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
