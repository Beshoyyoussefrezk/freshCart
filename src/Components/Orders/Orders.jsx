// import Style from  './Orders.module.css';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Loading from '../Loading/Loading'

export default function Orders() {
    const token = localStorage.getItem('token');
    const { id } = jwtDecode(token)
    let [orders, setOrders] = useState(null)
    let [loading, setLoading] = useState(false)
    async function allOrders() {
        setLoading(true)
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        setOrders(data)
        setLoading(false)
    }


    useEffect(() => { allOrders() }, [])
    return <>
        <h1 className="text-center mt-5"><span className="text-main">O</span>rders</h1>
        {loading ? <Loading /> : ''}
        {orders?.map(order => <div className="row " key={order.id}>
            <div className="col-md-12">
                <div className="order bg-light  shadow text-muted p-3 rounded my-2">
                    <div className="row">
                        <div className="col-md-2">
                            <p className="fw-bolder">User Name</p>
                        </div>
                        <div className="col-md-10">
                            <p className="fw-bold fst-italic">: {order.user.name}</p>
                        </div>
                        <div className="col-md-2">
                            <p className="fw-bold">Delivery Details</p>
                        </div>
                        <div className="col-md-4">
                            <p className="fw-bold fst-italic">: {order.shippingAddress.details} , {order.shippingAddress.city}</p>
                        </div>
                        <div className="col-md-2">
                            <p className="fw-bold">Tel</p>
                        </div>
                        <div className="col-md-4">
                            <p className="fw-bold fst-italic">: {order.shippingAddress.phone}</p>
                        </div>
                        <div className="col-md-2">
                            <p className="fw-bold">Payment Method</p>
                        </div>
                        <div className="col-md-4">
                            <p className="fw-bold fst-italic">: {order.paymentMethodType}</p>
                        </div>
                        <div className="col-md-2">
                            <p className="fw-bold">Total price</p>
                        </div>
                        <div className="col-md-4">
                            <p className="fw-bold fst-italic">: {order.totalOrderPrice} EGP</p>
                        </div>
                        <div className="col-md-2">
                            <p className="fw-bold">Paid</p>
                        </div>
                        <div className="col-md-4">
                            <p className={ order.isPaid ?"fw-bold fst-italic text-main":"fw-bold fst-italic text-danger"} >:  {order.isPaid ? 'Yes' : 'No'}</p>
                        </div>
                        <div className="col-md-2">
                            <p className="fw-bold">Delivered</p>
                        </div>
                        <div className="col-md-4">
                            <p className={ order.isDelivered ?"fw-bold fst-italic text-main":"fw-bold fst-italic text-danger"}>: {order.isDelivered ? "Yes" : 'No'}</p>
                        </div>
                        <div className="row">
                            {order.cartItems.map(item => <div className="col-md-2" key={item.product._id}>
                                <div className="product p-2 text-center">
                                    <img src={item.product.imageCover} className="w-50 " alt={item.product.title} />
                                    <p className="mb-0 py-1">{item.product.title.split(' ').slice(0, 2).join(' ')}</p>
                                    <p>{item.count} Items</p>
                                    <p>one piece {item.price} EGP</p>
                                    <p>all pieces {item.price * item.count} EGP</p>
                                </div>
                            </div>
                            )}

                        </div>

                    </div>


                </div>
            </div>
        </div>
        )}
    </>
}
