import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';

// Gifs import
import doggo from '../assets/doggo.gif';
import ana from '../assets/anaMorales.gif';

let tempCart = [];
const ShoppingCart = ({cart, setCart}) => {
  return(
    <div className="mt-5 mr-auto ml-auto">
    { cart.length === 0 ?
      (<div id='emptyWishlistsBg' 
        className='pt-10 pl-10 pr-10 text-center rounded-md ml-auto mr-auto'
        ><span id='noLoadText' className='text-3xl bg-black'>
        Your cart is empty.</span>
        <br />
        <span className='text-1xl bg-black'>Go to <span className='underline text-blue-500'><Link to="/Store">Store</Link></span> to add items to the cart.</span>
        <img src={doggo} alt="wink" 
          width={580} 
          height={500} 
          className='pt-2 mr-auto ml-auto' 
          id='gifEmptyWishList' 
          />
        </div>) : 
        <div id="cardsBg" className="lg:ml-60 lg:mr-60 flex flex-wrap justify-center gap-2 p-5 sm:ml-0 sm:mr-0">
          {cart.map((dt) => (
            <Card className="w-72 flex flex-col h-96" key={dt.id}>
              <img
                className="mt-16 mx-auto block"
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
                {/* Cart icon */}  
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
    }
  </div>
  )
}

ShoppingCart.propTypes ={
  cart: PropTypes.array,
  setCart: PropTypes.any,  
}

export default ShoppingCart;