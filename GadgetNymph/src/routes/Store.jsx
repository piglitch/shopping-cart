import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';

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
  }, []);
  
  return { data, error, loading };
}

const Store = ({wishList, setWishList, cart, setCart}) => {
  const { data, error, loading } = useData();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    wL = wishList;
    // Use setTimeout to set a 3-second delay before setting loading to false
    const timeoutId = setTimeout(() => {
      setShowLoading(false);
    }, 2200);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, [wishList]); 
  
  if (error) return <p className="mt-40">A network error was encountered</p>
  if (loading || showLoading) return <div className="mt-5 mr-auto ml-auto"><div id='emptyWishlistsBg' className='pt-10 pl-10 pr- text-center text-black rounded-md ml-auto mr-auto'><span className='text-3xl bg-black'>Wait a second. Will you?</span><img src="https://media.giphy.com/media/WPnkYvU8MEJnr8eNqO/giphy-downsized-large.gif" alt="wait babes" width={480} className='pt-2 mr-auto ml-auto' id='gifStoreLoad' /></div></div>
  return (
    <div id="cardsBg" className="lg:ml-60 lg:mr-60 flex flex-wrap justify-center gap-2 p-5 sm:ml-0 sm:mr-0">
      {data.map((dt) => (
        <Card className="w-72 flex flex-col h-96" key={dt.id}>
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
                const wishButton = document.getElementById(`fav${dt.id}`);
                const doesItemExist = wishList.some(item => item.id === dt.id)
                if (doesItemExist != true) {
                  const newItem = {id: dt.id, title: dt.title, price: dt.price, pic: dt.image, listed: true}
                  wL.push(newItem);
                  wishButton.style.color = 'red';
                  setWishList(wL);
                  console.log(wishList, wL)
                  return;  
                }              
                wishButton.style.color = 'gray';
                wL = wishList.filter(dtWish => dt.id !== dtWish.id)
                setWishList(wL);
                console.log(wishList)
              }}
            >
              <FavoriteIcon />
            </IconButton>

            <IconButton id={`cart${dt.id}`} style={{color: 'gray'}} 
              onClick={() => {

               // const cartButton = document.getElementById(`cart${dt.id}`);
                const doesItemExist = cart.some(item => item.id === dt.id)
                const currentItem = cart.filter(item => item.id === dt.id)
                const newItem = {id: dt.id, title: dt.title, price: dt.price, pic: dt.image, listed: true, qty: 1}                
  
                if (doesItemExist === true) {
                  currentItem[0].qty = currentItem[0].qty + 1;  
                  //console.log('hi', tempCart, currentItem[0].qty)
                  document.getElementById(`badge${dt.id}`).innerText = `${currentItem[0].qty}`;
                  
                  return;
                }
                tempCart.push(newItem);
                setCart(tempCart);       
                //tempCart = cart.filter(dtCart => dt.id === dtCart.id)
                //setCart(tempCart);
                //console.log(tempCart, currentItem)
                if (!currentItem.qty) {
                  document.getElementById(`badge${dt.id}`).innerText = 1;  
                  console.log(cart)
                  //console.log('none')
                  return;
                }
                document.getElementById(`badge${dt.id}`).innerText = `${currentItem[0].qty}`;
                console.log(cart)
              }}
            >
              <Badge color="primary">
                <ShoppingCartIcon />
                <span className="text-sm text-red-500" id={`badge${dt.id}`}>{ cart.find(item => item.id === dt.id)?.qty || '' }</span>
              </Badge>
            </IconButton>
            <IconButton aria-label="share" style={{color: 'gray'}}>
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  )
}
// Adding propTypes
Store.propTypes = {
  wishList: PropTypes.array,
  setWishList: PropTypes.any,
  cart: PropTypes.array,
  setCart: PropTypes.any,
}


export default Store;
