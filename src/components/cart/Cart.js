import Card from "../UI/Card";
import CartItem from "./CartItem";
import classes from './Cart.module.css';
import { useSelector } from "react-redux";
const Cart=(props)=>{
    const productList=useSelector(state=>state.cart.items);
    return(
        <Card className={classes.cart}>
            <h2>Your Cart</h2>
            <ul>
                {productList.map((item)=>(<CartItem key={item.id}
                item={{ id:item.id ,title: item.title, quantity: item.quantity, total: item.total, price: item.price }}></CartItem>))}
            </ul>
        </Card>
    );
}
export default Cart;