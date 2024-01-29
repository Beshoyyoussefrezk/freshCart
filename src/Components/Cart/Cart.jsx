// import Style from  './Cart.module.css';
import { useContext, useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { cartContext } from "../../Context/CartContext"
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Cart() {
    let { getCart, removeCartItem, updateCartItem, setNumOfCartItems, clearCartItems, setCartId } = useContext(cartContext);
    let [cartDetails, setCartDetails] = useState('');
    let [loading, setLoading] = useState(false);

    useEffect(()=>{
        displayCart()
    },[])

    async function displayCart() {
        setLoading(true)
        let { data } = await getCart();
        if (data === undefined) {
            setCartDetails('No products in your cart');
            setNumOfCartItems(0)
        }
        else {
            setCartDetails(data);
            setCartId(data.data._id)
        }
        setLoading(false);
    }

    async function removeItem(id) {
        setLoading(true)
        let { data } = await removeCartItem(id)
        setCartDetails(data);
        setNumOfCartItems(data.numOfCartItems)
        setLoading(false);

    }

    async function updateCart(id, count) {
        setLoading(true)
        let { data } = await updateCartItem(id, count)
        setCartDetails(data);
        setNumOfCartItems(data.numOfCartItems)
        setLoading(false);

    }

    async function clearCart() {
        setLoading(true)
        let { data } = await clearCartItems()
        if (data.message === 'success') {
            setNumOfCartItems(0)
            setCartDetails('No products in your cart')
        }
        setLoading(false)


    }
    return <>
        <Helmet>
            <title>The Cart</title>
        </Helmet>
        {loading ? <Loading /> : ''}

        <div className=" my-5 p-4" style={loading ? { cursor: 'wait' } : { cursor: 'auto' }}>
            <div className="row align-items-center">
                <div className="col-md-9">
                    <div className="shop-cart">
                        <h1 className="fw-bolder">Shop Cart</h1>
                    </div>
                </div>
                {cartDetails === 'No products in your cart' ? '' : <div className="col-md-3 text-center">
                    <div className="cart-items">
                        <div>Total: <span className="text-main fw-bolder">{cartDetails.data?.totalCartPrice}</span>  EGP
                            (<span className="text-main fw-bolder">{cartDetails.numOfCartItems}</span>  {cartDetails.numOfCartItems === 1 ? 'item' : 'items'})
                            <span className="text-main ms-3 fw-lighter fst-italic font-sm cursor-pointer" onClick={clearCart}>Clear all</span>
                        </div>
                    </div>
                </div>}
                {cartDetails === 'No products in your cart' ? <h2 className="mt-5 text-main text-center">{cartDetails}</h2> : ''}
            </div>
            {cartDetails.data?.products.map(product => <div key={product._id} className="row">
                <hr className="mt-3" />
                <div className="col-lg-1 col-md-3 mb-3">
                    <img src={product.product.imageCover} alt={product.product.title} className="w-100" />
                </div>
                <div className="col-lg-11 col-md-9">
                    <div className="row justify-content-between">
                        <div className="col-md-10 ">
                            <div className="title-price">
                                <h4 className="h6 ">{product.product.title}</h4>
                                <p className="text-main fw-bolder mb-1">{product.product.category.name}</p>
                                <p className="text-muted">{product.price} EGP</p>
                            </div>
                        </div>

                        <div className="col-md-1">
                            <div className="d-flex flex-column justify-content-center align-items-center ">
                                <div className="arrow-up cursor-pointer text-main" onClick={() => updateCart(product.product.id, product.count + 1)}>
                                    <i className="fa-solid fa-chevron-up"></i>
                                </div>
                                <div className="count">{product.count}</div>
                                <div className="arrow-down cursor-pointer text-main" onClick={() => updateCart(product.product.id, product.count - 1)}>
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-1 d-flex">
                            <div className="remove-update ms-auto">
                                <div className="icon-remove text-danger cursor-pointer" onClick={() => removeItem(product.product.id)}>
                                    <i className="fa-solid fa-xmark "></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                <div className="col">
                    <Link to='/address' className="btn bg-main mt-5 text-white px-3">Online Payment</Link>
                </div>
                <div className="col">
                    <Link to='/cash' className="btn bg-main mt-5 text-white px-3">Cash Payment</Link>
                </div>
            </div>
            </div>)}
         
        </div>

    </>
}
