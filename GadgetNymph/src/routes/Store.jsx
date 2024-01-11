import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

let wL = []

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


const Store = ({wishList, setWishList}) => {
  const { data, error, loading } = useData();
  
  if (error) return <p className="mt-40">A network error was encountered</p>
  if (loading) return <p className="mt-40">Loading...</p>;

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
                const currentItem = wishList.filter(item => item.id === dt.id)
                if (doesItemExist != true) {
                  const newItem = {id: dt.id, title: dt.title, price: dt.price, listed: true}
                  wL.push(newItem)
                  wishButton.style.color = 'red';
                  setWishList(wL)
                  return;  
                }              
                wishButton.style.color = 'gray';
                wL.splice(wL.indexOf(currentItem), 1)
                setWishList(wL);
              }}
            >
              <FavoriteIcon />
            </IconButton>

            <IconButton style={{color: 'gray'}}>
              <ShoppingCartIcon />
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
}


export default Store;
