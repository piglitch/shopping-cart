import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// Gifs import
import Shush from '../assets/shush.gif';
import ana from '../assets/anaMoralesKiss.gif';
import { useEffect } from 'react';

let wL = [];
let tempCart = [];

const WishList = ({wishList, setWishList, cart, setCart}) => {
  console.log('21', cart)
  useEffect(() => {
    if (wishList.length === 0) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return;
    }       
    document.body.style.overflow = '';  // Reset to default
    document.documentElement.style.overflow = '';  // Reset to default

    const storedItems = JSON.parse(localStorage.getItem('cart'));
    if (storedItems) {
      setCart(storedItems)
      console.log(storedItems, cart)
      return;
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log(storedItems)
  }, [wishList]);

  useEffect(() => {
    const storedWishlistItems = JSON.parse(localStorage.getItem('wishlist'));
    if (storedWishlistItems) {
      setWishList(storedWishlistItems)
      return;
    }
    localStorage.setItem('wishlist', JSON.stringify(wishList))
    console.log(storedWishlistItems)
  }, []);

  const toggleGif = () => {
  //  console.log('clicked!');
    if (document.getElementById('gifEmptyWishList').src.endsWith(Shush)) {
      document.getElementById('gifEmptyWishList').src = ana;
      document.getElementById('noLoadText').innerText = `So, you found me? Here is a kiss ;)`
      return;
    }
    document.getElementById('gifEmptyWishList').src = Shush;
  }
  return(
    <div>
      { wishList.length === 0 ?   
        (<div id='emptyWishlistsBg' 
        className='pt-10 pl-10 pr-10 h-screen flex-col text-center'
        ><span id='noLoadText' className='text-3xl bg-black'>
        Oops, nothing to see here. Or is there?</span>
        <br />
        <span className='text-1xl bg-black'>Go to <span className='underline text-blue-500'><Link to="/Store">Store</Link></span> to add items to the wishlist.</span>
        <img src={Shush} alt="wink" 
          className='left-0 right-0 ml-auto mr-auto w-full cursor-pointer absolute bottom-0' 
          style={{ width: '600px', height: 'auto' }}
          id='gifEmptyWishList' 
          onClick={toggleGif} 
          />
        </div>) : 
        <div>
        <h1 className='text-yellow-400 text-3xl font-extrabold w-full p-2 bg-gradient-to-r from-black to-white'>Wishlist</h1>
        <div id="cardsBg" className="lg:ml-60 lg:mr-60 flex flex-wrap justify-center gap-2 p-5 sm:ml-0 sm:mr-0">
        {wishList.map((dt) => (
          <Card className="w-72 flex flex-col h-96 drop-shadow-lg" key={dt.id}>
            <img
              className="mx-auto block"
              src={dt.pic}
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
                style={{color: 'gray'}} 
                onClick={() =>{ 
                  wL = wishList;
                  const wishButton = document.getElementById(`fav${dt.id}`);
                  const currentItem = wishList.filter(item => item.id === dt.id)
                  wishButton.style.color = 'gray';
                  console.log(currentItem)
                  wL = wishList.filter(dtWish => dt.id !== dtWish.id)
                  setWishList(wL);
                  localStorage.setItem('wishlist', JSON.stringify(wL))
                  console.log(wishList)
                }}
              >
                <DeleteIcon />
              </IconButton>
  
              <IconButton id={`cart${dt.id}`} style={{color: 'gray'}} 
              onClick={() => {
                tempCart = cart;
               // const cartButton = document.getElementById(`cart${dt.id}`);
              //  const doesItemExist = cart.some(item => item.id === dt.id)
                const currentItem = cart.filter(item => item.id === dt.id)
                const newItem = {id: dt.id, title: dt.title, price: dt.price, pic: dt.pic, listed: true, qty: 1}                
                console.log('Tempcart: ', tempCart, cart)

                if (currentItem.length !== 0 ) {
                  currentItem[0].qty = currentItem[0].qty + 1;  
                  console.log(1, tempCart, currentItem, newItem)
                  document.getElementById(`badge${dt.id}`).innerText = `${currentItem[0].qty}`;
                  localStorage.setItem('cart', JSON.stringify(tempCart))
                  return;
                }      
                //tempCart = cart.filter(dtCart => dt.id === dtCart.id)
                //setCart(tempCart);
                console.log('hi', 'Tempcart: ', tempCart, currentItem, newItem)
                if (currentItem.length === 0) {
                  document.getElementById(`badge${dt.id}`).innerText = 1;  
                  tempCart.push(newItem);
                  setCart(tempCart);
                  localStorage.setItem('cart', JSON.stringify(tempCart))
                  console.log(cart)
                  console.log(2, tempCart, currentItem, newItem)
                  return;
                }
                document.getElementById(`badge${dt.id}`).innerText = `${currentItem[0].qty}`;
                console.log(3, tempCart, currentItem, newItem)
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
      }
    </div>
  
  )
}

WishList.propTypes = {
  wishList: PropTypes.array,
  setWishList: PropTypes.any,
  cart: PropTypes.array,
  setCart: PropTypes.any,
}


export default WishList;

