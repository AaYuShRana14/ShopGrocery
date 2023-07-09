import classes from './CartButton.module.css';
import { uiAction } from '../store/ui-slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const CartButton=()=>{
    const quan=useSelector(state=>state.cart.totalQuantity)
    const dispatch=useDispatch();
    const showCartHandler=()=>{
        dispatch(uiAction.toggle());
    }
    return(
        <button className={classes.button} onClick={showCartHandler}>
            <span>My Cart</span>
            <span className={classes.badge}>{quan}</span>
        </button>
    );
}
export default CartButton;