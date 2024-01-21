import axios from "axios";
import { createContext, useState } from "react";

export let cartContext = createContext()

export default function CartContextProvider({ children }) {
    let [numOfCartItems, setNumOfCartItems] = useState(0)
    let [cartId, setCartId] = useState(null)
    let token = localStorage.getItem('token');
    let headers = { token }
    function addToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers }).then(response => response).catch(error => error)
    }
    function getCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers }).then(response => response).catch(error => error)
    }

    function removeCartItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers }).then(response => response).catch(error => error)
    }

    function updateCartItem(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers }).then(response => response).catch(error => error)

    }

    function clearCartItems(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
    }

    function CheckoutSession(cartId,url,shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {shippingAddress}, {headers}).then(response => response).catch(error => error)
    }

    function cashPayment(cartId,shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{shippingAddress}, {headers}).then(response => response).catch(error => error)
    }

    return <cartContext.Provider value={{ addToCart, getCart, numOfCartItems, setNumOfCartItems, removeCartItem, updateCartItem, clearCartItems, CheckoutSession, cartId , setCartId ,cashPayment }}>
        {children}
    </cartContext.Provider>
}