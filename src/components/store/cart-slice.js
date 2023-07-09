import { createSlice } from "@reduxjs/toolkit";
import { uiAction } from "./ui-slice";
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed:false
    },
    reducers: {
        replaceCart(state,action){
            state.totalQuantity=action.payload.totalQuantity;
            state.items=action.payload.items;
        },
        addItemToCart(state, action) {
            state.totalQuantity++;
            state.changed=true;
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (!existingItem) {
                state.items.push({ id: newItem.id, price: newItem.price, title: newItem.title, quantity: 1, total: newItem.price });
            }
            else {
                existingItem.quantity++;
                existingItem.total = existingItem.total + newItem.price;
            }
        },
        removeFromCart(state, action) {
            state.totalQuantity--;
            const id = action.payload;
            state.changed=true;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            }
            else {
                existingItem.quantity--;
                existingItem.total = existingItem.total - existingItem.price;
            }
        }
    }
});
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiAction.showNotification({
            status: 'pending',
            title: 'Sending',
            message: 'Sending Cart Data'
        }));
        const sendRequest = async () => {
            const response = await fetch('https://reduxprac-70697-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({items:cart.items,totalQuantity:cart.totalQuantity}),
            });
            if (!response.ok) {
                throw new Error('Sending cart data failed');
            }
        }
        try {
            await sendRequest();
            dispatch(uiAction.showNotification({
                status: 'success',
                title: 'success...',
                message: 'Sent data'
            }));
        }
        catch (error) {
            dispatch(uiAction.showNotification({
                status: 'error',
                title: 'error',
                message: 'sending data failed'
            }));
        }

    }
}
export const fetchCartData=()=>{
    return async(dispatch)=>{
        const fetchData=async()=>{
            const response=await fetch('https://reduxprac-70697-default-rtdb.firebaseio.com/cart.json');
            if(!response.ok){
                throw new Error('Could not fetch cart data');
            }
            const data=await response.json();
            return data;
        };
        try{
            const cartData=await fetchData();
            dispatch(cartActions.replaceCart({
                items:cartData.items||[],
                totalQuantity:cartData.totalQuantity
            }));

        }
        catch(error){
            dispatch(uiAction.showNotification({
                status: 'error',
                title: 'error',
                message: 'Loading data failed'
            }));
        }
    }
}
export const cartActions = cartSlice.actions;
export default cartSlice;
