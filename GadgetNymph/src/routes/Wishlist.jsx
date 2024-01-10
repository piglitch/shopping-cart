const WishList = ({wishList}) => {
  console.log(wishList)
  return(
    <div className="mt-40">{JSON.stringify(wishList)}</div>
  )
}

export default WishList;