import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Badge from '@mui/material/Badge';

// Gifs import
import doggo from '../assets/doggo.gif';
import { useEffect, useState } from 'react';

let cL = [];

function Checkout() {
  const { enqueueSnackbar } = useSnackbar();


  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Your order is placed!', { variant });
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickVariant('success')}>Checkout</Button>
    </React.Fragment>
  );
}

const ShoppingCart = ({cart, setCart}) => {
  const [total, setTotal] = useState(0);
  useEffect(()=> {
    if (cart.length === 0) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return;
    }       
    document.body.style.overflow = '';  // Reset to default
    document.documentElement.style.overflow = '';  // Reset to default
    setTotal(cart.reduce((acc, item) => acc + item.price * item.qty, 0))
  }, [cart])

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cart'));
    if (storedItems) {
      setCart(storedItems)
      return;
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log(storedItems)
  }, [])
  
  console.log('20:', cart)
  return(
    <div>
    { cart.length === 0 ?
      (<div id='emptyWishlistsBg' 
        className='pt-10 pl-10 pr-10 text-center h-screen rounded-md ml-auto mr-auto'
        ><span id='noLoadText' className='text-3xl bg-black'>
        Your cart is empty. So, here is a dog.</span>
        <br />
        <span className='text-1xl bg-black'>Go to <span className='underline text-blue-500'><Link to="/Store">Store</Link></span> to add items to the cart.</span>
        <img src={doggo} alt="doggo" 
          className='left-0 right-0 ml-auto mr-auto w-full cursor-pointer absolute bottom-0' 
          style={{ width: '600px', height: 'auto' }} 
          id='gifEmptyWishList' 
          />
        </div>) :
        <div>
        <h1 className='text-yellow-400 text-3xl font-extrabold w-1/3 p-2 bg-gradient-to-r from-black to-white'>Cart</h1>
        <div className='flex gap-0'>       
        <div id="cardsBg" className="lg:ml-60 lg:mr-60 flex flex-wrap justify-center gap-2 p-5 sm:ml-0 sm:mr-0">
          {cart.map((dt) => (
            <Card className="w-72 flex flex-col h-96 drop-shadow-lg" key={dt.id}>
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
                    cL = cart
                    console.log('61', dt.pic, dt.image, cart)
                   // const doesItemExist = cart.some(item => item.id === dt.id)
                    const currentItem = cart.filter(item => item.id === dt.id)
                    const newItem = {id: dt.id, title: dt.title, price: dt.price, pic: dt.image, listed: true, qty: 1}                
      
                    if (!currentItem.length !== 0) {
                      currentItem[0].qty = currentItem[0].qty + 1;  
                      document.getElementById(`badge${dt.id}`).innerText = `${currentItem[0].qty}`;
                      setTotal(cart.reduce((acc, item) => acc + item.price * item.qty, 0));
                      localStorage.setItem('cart', JSON.stringify(cL))
                      return;
                    }
                    cL.push(newItem);
                    setCart(cL);       
                    localStorage.setItem('cart', JSON.stringify(cL))
                    if (!currentItem.length === 0) {
                      document.getElementById(`badge${dt.id}`).innerText = 1;  
                      setTotal(cart.reduce((acc, item) => acc + item.price * item.qty, 0));
                      console.log('75', cart)
                      return;
                    }
                    document.getElementById(`badge${dt.id}`).innerText = `${currentItem[0].qty}`;
                    console.log('79', cart)
                  }}
                >
                  <Badge color="primary">
                    <AddIcon />
                  </Badge>
                </IconButton>
                <IconButton id={`cart${dt.id}`} style={{color: 'gray'}} 
                  onClick={() => {
                   // const doesItemExist = cart.some(item => item.id === dt.id)
                    const currentItem = cart.filter(item => item.id === dt.id)
                    const newItem = {id: dt.id, title: dt.title, price: dt.price, pic: dt.image, listed: true, qty: 1}                
   
                    if (currentItem[0].qty === 1) {
                      const currentItem = cart.filter(item => item.id === dt.id)
                      console.log('95', currentItem, 1)
                      cL = cart.filter(dtWish => dt.id !== dtWish.id)
                      setCart(cL);
                      localStorage.setItem('cart', JSON.stringify(cL))
                      console.log('98', cart, cL, 2)  
                      setTotal(cart.reduce((acc, item) => acc + item.price * item.qty, 0));
                      return;
                    }
                    if (currentItem.length !== 0) {
                      currentItem[0].qty = currentItem[0].qty - 1;  
                      document.getElementById(`badge${dt.id}`).innerText = `${currentItem[0].qty}`;
                      console.log('104', cart, 3)
                      setTotal(cart.reduce((acc, item) => acc + item.price * item.qty, 0));
                      localStorage.setItem('cart', JSON.stringify(cL))
                      return;
                    }
                    cL.push(newItem);
                    setCart(cL);       
                    localStorage.setItem('cart', JSON.stringify(cL))
                    if (!currentItem[0].qty) {
                      document.getElementById(`badge${dt.id}`).innerText = 1;  
                      setTotal(cart.reduce((acc, item) => acc + item.price * item.qty, 0));
                      console.log('111', cart, 4)
                      localStorage.setItem('cart', JSON.stringify(cL))
                      return;
                    }
                    document.getElementById(`badge${dt.id}`).innerText = `${currentItem[0].qty}`;
                    console.log('115', cart, 5)
                  }}
                >
                  <Badge color="primary">
                    <RemoveIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label="share" style={{color: 'gray'}}>
                  <ShareIcon />
                </IconButton>
                <span className='ml-28 text-gray-500'>Qty: </span>
                <span className="ml-1 text-red-500" id={`badge${dt.id}`}>{ cart.find(item => item.id === dt.id)?.qty || '' }</span>
              </CardActions>
            </Card>
          ))}
      </div>
      <div id='total' className='p-5 bg-slate-100 text-black shadow-lg'>
        <div className='p-5'>Total: ${Math.round(total)}.00
          <br />
          <SnackbarProvider maxSnack={3}>
            <button className='mt-10 p-1 border-slate-400 border-2 rounded-md bg-yellow-400' onClick={() => {
            //  setCart([])
              //localStorage.setItem('cart', JSON.stringify([]))

            }}><Checkout /></button>
          </SnackbarProvider>
        </div>
      </div>
      </div>
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