import { RouterProvider, createBrowserRouter } from "react-router-dom"

import ErrorPage from "./routes/ErrorPage"
import Root from "./routes/Root";
import Store from "./routes/Store";
import About from "./routes/About";
import WishList from "./routes/Wishlist";
import ShoppingCart from "./routes/ShoppingCart";
import { useState } from "react";
import Electronics from "./routes/ElectronicsPage";
import MensClothing from "./routes/Men'sClothing";
import Jeweleries from "./routes/Jeweleries";
import WomensClothing from "./routes/WomensClothing";

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
        cart={cart}
        setCart={setCart} 
      />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/category/electronics',
          element: <Electronics 
            wishList={wishList} 
            setWishList={setWishList} 
            cart={cart}
            setCart={setCart} 
            count={count}
            setCount={setCount}
          />,
        },
        {
          path: '/category/mensclothing',
          element: <MensClothing 
            wishList={wishList} 
            setWishList={setWishList} 
            cart={cart}
            setCart={setCart} 
            count={count}
            setCount={setCount}
          />,
        },
        {
          path: '/category/womensclothing',
          element: <WomensClothing 
            wishList={wishList} 
            setWishList={setWishList} 
            cart={cart}
            setCart={setCart} 
            count={count}
            setCount={setCount}
          />,
        },
        {
          path: '/category/jewelery',
          element: <Jeweleries 
            wishList={wishList} 
            setWishList={setWishList} 
            cart={cart}
            setCart={setCart} 
            count={count}
            setCount={setCount}
          />,
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
          element: <ShoppingCart 
            cart={cart}
            setCart={setCart} 
          />
        }
      ],
    },
  
  ]);
  return <RouterProvider router={router} />
};

export default Router;