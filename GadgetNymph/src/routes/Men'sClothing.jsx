import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import ana from '../assets/oneSec.gif';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

let wL = []
let tempCart = []

const useData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 

    fetch('https://fakestoreapi.com/products', {mode: "cors"})
    .then((res) => {
      if (!res.ok) {
        throw new Error(`This is an HTTP error: The status is ${res.status}`);
      }
      return res.json();
    })
    .then((res) => setData(res))
    .catch((err) => setError(err))
    .finally(() => setLoading(false));
    console.log(data)
  }, []);
  
  return { data, error, loading };
}


const MensClothing = ({wishList, setWishList, cart, setCart}) => {
  const { data, error, loading } = useData();
  const [showLoading, setShowLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([])

  useEffect(() => {
    wL = wishList;
    // Use setTimeout to set a 3-second delay before setting loading to false
    const timeoutId = setTimeout(() => {
      setShowLoading(false);
    }, 2200);
    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, [wishList]); 

  useEffect(()=>{
    if (showLoading) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return;
    }       
    document.body.style.overflow = '';  // Reset to default
    document.documentElement.style.overflow = '';  // Reset to default

  }, [showLoading])
  useEffect(() => {
    if (!loading) {      
      setCategoryData(data.filter(item => item.category === `men's clothing`))
      console.log(categoryData)      
      return;
    }
  }, [loading])
  useEffect(() => {
 // Reset to default
    const storedCartItems = JSON.parse(localStorage.getItem('cart'));
    const storedWishlistItems = JSON.parse(localStorage.getItem('wishlist'));
    console.log(storedCartItems, storedWishlistItems)
    if (storedCartItems) {
      setCart(storedCartItems)
      console.log(storedCartItems)
    }
    if (storedWishlistItems) {
      setWishList(storedWishlistItems)
      console.log(storedWishlistItems)
    }
    else{
      localStorage.setItem('cart', JSON.stringify(cart))
      localStorage.setItem('wishlist', JSON.stringify(wishList))
      console.log(storedCartItems, storedWishlistItems)
  }
  }, [])
  
  if (error) return <p className="mt-40">A network error was encountered</p>
  if (loading || showLoading) return <div className="h-screen">
      <div id='emptyWishlistsBg' className='pt-10 text-center text-black rounded-md ml-auto mr-auto'>
        <span className='text-3xl bg-black'>Wait a second. Will you?</span>
        <img src={ana} alt="wait" 
        width={650} className='pt-2 mr-auto ml-auto' id='gifStoreLoad' />
      </div>
    </div>

  return (
    <div>
    <h1 className='text-6xl font-extrabold text-black w-full p-2 bg-gradient-to-r from-yellow-300 to-white'>
      Men's Clothing
    </h1>
    <div id="cardsBg" className="lg:ml-60 lg:mr-60 flex flex-wrap justify-center gap-2 p-5 sm:ml-0 sm:mr-0">
      {categoryData.map((dt) => (
        <Card className="w-72 flex flex-col h-96 drop-shadow-lg" key={dt.id}>
          <img
            className="mt-16 mx-auto block"
            src={dt.image}
            height={80}
            width={70}
            alt={dt.title}
          />
          <CardHeader
            className="text-sm"
            title={
              <Typography variant="h8" component="div">
                {dt.title}
              </Typography>
            }
            subheader={`$${dt.price}`}
          />
          {/* Wishlist icon */}
          <CardActions disableSpacing className="mt-auto bg-amber-400">
            <IconButton 
              id={`fav${dt.id}`} 
              aria-label="add to favorites" 
              style={wishList.some(item => item.id === dt.id) ? {color: 'red'} : {color: 'gray'}} 
              onClick={() =>{ 
                wL = wishList
                const wishButton = document.getElementById(`fav${dt.id}`);
                const doesItemExist = wishList.some(item => item.id === dt.id)
                console.log(doesItemExist)
                if (doesItemExist != true) {
                  const newItem = {id: dt.id, title: dt.title, price: dt.price, pic: dt.image, listed: true}
                  console.log(newItem)
                  wL.push(newItem);
                  wishButton.style.color = 'red';
                  setWishList(wL);
                  localStorage.setItem('wishlist', JSON.stringify(wL))
                  console.log(wishList, wL)
                  return;  
                }              
                wishButton.style.color = 'gray';
                wL = wishList.filter(dtWish => dt.id !== dtWish.id)
                setWishList(wL);
                localStorage.setItem('wishlist', JSON.stringify(wL))
                console.log(dt.image)
              }}
            >
              <FavoriteIcon />
            </IconButton>

            {/* Cart icon */}  
            <IconButton id={`cart${dt.id}`} style={{color: 'gray'}} 
              onClick={() => {
                tempCart = cart
               // const cartButton = document.getElementById(`cart${dt.id}`);
                const doesItemExist = cart.some(item => item.id === dt.id)
                const currentItem = cart.filter(item => item.id === dt.id)
                const newItem = {id: dt.id, title: dt.title, price: dt.price, pic: dt.image, listed: true, qty: 1}                
  
                if (doesItemExist === true) {
                  currentItem[0].qty = currentItem[0].qty + 1;  
                  //console.log('hi', tempCart, currentItem[0].qty)
                  document.getElementById(`badge${dt.id}`).innerText = `${currentItem[0].qty}`;
                  localStorage.setItem('cart', JSON.stringify(tempCart))
                  return;
                }
                tempCart.push(newItem);
                setCart(tempCart);   
                localStorage.setItem('cart', JSON.stringify(tempCart))    
                //tempCart = cart.filter(dtCart => dt.id === dtCart.id)
                //setCart(tempCart);
                //console.log(tempCart, currentItem)
                if (!currentItem.qty) {
                  document.getElementById(`badge${dt.id}`).innerText = 1;  
                  console.log(cart)
                  localStorage.setItem('cart', JSON.stringify(tempCart))
                  //console.log('none')
                  return;
                }
                document.getElementById(`badge${dt.id}`).innerText = `${currentItem[0].qty}`;
                console.log(cart)
              }}
            >
              <ShoppingCartIcon />
              <span className="text-sm text-red-500" id={`badge${dt.id}`}>{ cart.find(item => item.id === dt.id)?.qty || '' }</span>
            </IconButton>
            <IconButton aria-label="share" style={{color: 'gray'}}>
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
    </div>
  )
}
// Adding propTypes
MensClothing.propTypes = {
  wishList: PropTypes.array,
  setWishList: PropTypes.any,
  cart: PropTypes.array,
  setCart: PropTypes.any,
}


export default MensClothing;
