import { RouterProvider, createBrowserRouter } from "react-router-dom"

import ErrorPage from "./routes/ErrorPage"
import Root from "./routes/Root";
import Random from "./routes/Random";
import Store from "./routes/Store";
import About from "./routes/About";
import WishList from "./routes/Wishlist";
import ShoppingCart from "./routes/ShoppingCart";
import { useState } from "react";

const Router = () => {
  const [wishList, setWishList] = useState([]);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);

  const router = createBrowserRouter([
    
    {
      path: '/',
      element: <Root 
        wishList={wishList}
        setWishList={setWishList}
      />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/category',
          element: <Random />,
        },
        {
          path: '/Store',
          element: <Store 
            wishList={wishList} 
            setWishList={setWishList} 
            cart={cart}
            setCart={setCart} 
            count={count}
            setCount={setCount}
          />
        },
        {
          path: '/About',
          element: <About />
        },
        {
          path: '/wishlist',
          element: <WishList 
            wishList={wishList} 
            setWishList={setWishList}
            cart={cart}
            setCart={setCart}
            count={count}
            setCount={setCount}
          />
        },
        {
          path: '/shoppingcart',
          element: <ShoppingCart />
        }
      ],
    },
  
  ]);
  return <RouterProvider router={router} />
};

export default Router;