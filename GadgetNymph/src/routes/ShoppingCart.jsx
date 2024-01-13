import PropTypes from 'prop-types';

const ShoppingCart = ({cart, setCart}) => {
  return(
    <div className="mt-40">{cart.map(item => item.title)}</div>
  )
}

ShoppingCart.propTypes ={
  cart: PropTypes.array,
  setCart: PropTypes.any,  
}

export default ShoppingCart;