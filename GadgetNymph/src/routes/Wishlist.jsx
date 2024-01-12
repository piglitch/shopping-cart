import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// Gifs import
import Kate from '../assets/kateUpton.gif';
import Shush from '../assets/shush.gif';
import ana from '../assets/anaMoralesKiss.gif';

let wL = []
const WishList = ({wishList, setWishList}) => {
  const toggleGif = () => {
  //  console.log('clicked!');
    if (document.getElementById('gifEmptyWishList').src.endsWith(Shush)) {
      document.getElementById('gifEmptyWishList').src = ana;
      document.getElementById('noLoadText').innerText = `So, you found me? ;) `
      //console.log('click', document.getElementById('gifEmptyWishList').src);
      return;
    }
    document.getElementById('gifEmptyWishList').src = Shush;
    //console.log('clicked');
  }
  return(
    <div className="mt-5 mr-auto ml-auto">
      { wishList.length === 0 ?  
        (<div id='emptyWishlistsBg' 
        className='pt-10 pl-10 pr-10 text-center text-black rounded-md ml-auto mr-auto'
        ><span id='noLoadText' className='text-3xl bg-black'>
        Oops, nothing to see here. Or is there?</span>
        <img src={Shush} alt="wink" 
          width={480} 
          height={500} 
          className='pt-2 mr-auto ml-auto cursor-pointer' 
          id='gifEmptyWishList' 
          onClick={toggleGif} 
          />
        </div>) : 
        <div id="cardsBg" className="lg:ml-60 lg:mr-60 flex flex-wrap justify-center gap-2 p-5 sm:ml-0 sm:mr-0">
        {wishList.map((dt) => (
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
                    wL.push(newItem);
                    wishButton.style.color = 'red';
                    setWishList(wL);
                    console.log(wishList, wL)
                    return;  
                  }              
                  wishButton.style.color = 'gray';
                  console.log(currentItem)
                  wL = wishList.filter(dtWish => dt.id !== dtWish.id)
                  setWishList(wL);
                  console.log(wishList)
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
      }
    </div>
  
  )
}

WishList.propTypes = {
  wishList: PropTypes.array,
  setWishList: PropTypes.any,
}


export default WishList;

