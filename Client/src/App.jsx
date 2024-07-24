import React from 'react';
import Counter from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Cart from './features/cart/Cart';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/cart/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/product-details",
    element: <ProductDetailsPage />,
  },
]);


function App() {
  return (
    <div className="h-full min-h-[100vh] bg-gray-100">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;