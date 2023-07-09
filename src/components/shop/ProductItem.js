import Card from "../UI/Card";
import classes from './ProductItem.module.css';
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
const ProductItem = (props) => {
    const { title, price, id } = props;
    const dispatch=useDispatch();
    const addItemHandler=()=>{
        dispatch(cartActions.addItemToCart({title,id,price}));
    }
    return (
        <li className={classes.item} >
            <Card>
                <header>
                    <h3>{title}</h3>
                    <div><div className={classes.price}>Rs.{price.toFixed(2)}</div></div>
                </header>
                <div className={classes.actions}>
                    <button onClick={addItemHandler}>Add to Cart</button>
                </div>
            </Card>
        </li>
    );
}
export default ProductItem;