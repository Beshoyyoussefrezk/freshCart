//import Style from './Address.module.css';
import freshcartCover from '../../Assets/freshcart.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react';
import Loading from "../Loading/Loading"
import { Helmet } from 'react-helmet';
import { cartContext } from '../../Context/CartContext';


export default function Address() {
    let {cartId , CheckoutSession,setNumOfCartItems} = useContext(cartContext)
    let [domin , setDomin] = useState(null)
    let [loading, setLoading] = useState(false)
    useEffect(()=>{
        setDomin(window.location.origin)
    },[])
    async function onlinePaymentSubmit(values) {
        setLoading(true)
        let {data} = await CheckoutSession(cartId,domin,values)
        setNumOfCartItems(0)
        window.location.href = data?.session.url;
        setLoading(false)
        
    }
    let validationSchema = Yup.object({
        details: Yup.string('please enter details valid').required('the details is required'),
        phone: Yup.string('please enter phone valid').required('the phone is required'),
        city: Yup.string('please enter city valid').required('the city is required'),
    })
    let formik = useFormik({
        initialValues: {
            "details": "",
            "phone": "",
            "city": ""
        },
        validationSchema,
        onSubmit: onlinePaymentSubmit

    })
    return <>
        <Helmet>
            <title>Online Payment</title>
        </Helmet>
        {loading ? <Loading /> : ''}
        <h1 style={{ color: '#2C504C' }} className='my-5 fw-bolder fs-1'><span className='text-main'>O</span>nline <span className='text-main'>P</span>ayment</h1>
        <div className="row pb-5 w-75 m-auto" style={loading ? { cursor: 'wait' } : { cursor: 'auto' }}>
            <div className="col-md-6 pe-5">
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group d-flex justify-content-center align-items-center position-relative mb-3">
                        <label htmlFor="details" className='icon position-absolute'>
                            <i className="fa-solid fa-info text-main"></i>
                        </label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete='userDetails' value={formik.values.details} name='details' type="text" id='details' className='inp form-control ps-5' placeholder='Details' />
                    </div>
                    {formik.errors.details && formik.touched.details ? <div className="alert text-danger ">* {formik.errors.details}</div> : ''}

                    <div className="form-group d-flex justify-content-center align-items-center position-relative mb-3">
                        <label htmlFor="phone" className='icon position-absolute'>
                            <i className="fa-solid fa-phone text-main"></i>
                        </label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete='userPhone' value={formik.values.phone} name='phone' type="text" id='phone' className='inp form-control ps-5' placeholder='Phone' />
                    </div>
                    {formik.errors.phone && formik.touched.phone ? <div className="alert text-danger ">* {formik.errors.phone}</div> : ''}

                    <div className="form-group d-flex justify-content-center align-items-center position-relative mb-3">
                        <label htmlFor="city" className='icon position-absolute'>
                            <i className="fa-solid fa-city text-main"></i>
                        </label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete='userCity' value={formik.values.city} name='city' type="text" id='city' className='inp form-control ps-5' placeholder='City' />
                    </div>
                    {formik.errors.city && formik.touched.city ? <div className="alert text-danger ">* {formik.errors.city}</div> : ''}



                    <button type='submit' disabled={!formik.isValid && !formik.dirty} className=' btn bg-main text-white px-5'>Pay Now</button>

                </form>
            </div>
            <div className="col-md-6 d-flex align-items-center">
                <img src={freshcartCover} alt="freshcartCover" className='w-100 rounded ' />
            </div>
        </div>

    </>
}

