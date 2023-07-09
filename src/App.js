import MainHeader from "./components/layout/MainHeader";
import Cart from "./components/cart/Cart";
import Products from "./components/shop/Products";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendCartData } from "./components/store/cart-slice";
import { fetchCartData } from "./components/store/cart-slice";
import Notification from "./components/UI/Notification";
let isInitial=true;
function App() {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  useEffect(()=>{
    dispatch(fetchCartData());
  },[dispatch]);
  useEffect(() => {
    if(isInitial){
      isInitial=false;
      return;
    };
    if(cart.changed){

      dispatch(sendCartData(cart)); 
    }
  }, [cart, dispatch]);
  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}></Notification>}
      <MainHeader />
      {showCart && <Cart></Cart>}
      <Products></Products>
    </>
  );
}

export default App;
