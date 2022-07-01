import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import { addToCart } from '../actions/cartActions'

const CartScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  console.log(cartItems);

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  useEffect( () => {
    if(id){
      dispatch(addToCart(id, qty))
    }
  } , [dispatch, id, qty]);


  return (
    <div>CartScreen</div>
  )
}

export default CartScreen;