import Style from './SignUp.module.css';
import freshcartCover from '../../Assets/freshcart.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from "../Loading/Loading"
import { Helmet } from 'react-helmet';


export default function SignUp() {
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(false)
    let navigate = useNavigate()
    async function signupSubmit(values) {
        setLoading(true)
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values).catch((err) => {
            setError(err.response.data.message)
            setLoading(false)
        })
        if (data.message === 'success') {
            navigate('login')
            setLoading(false)
        }
    }
    let validationSchema = Yup.object({
        name: Yup.string('please enter name valid').min(3, 'please enter name at least 3 characters').max(15, 'please enter name the maximum 15 characters').required('the name is required'),
        email: Yup.string('please enter email valid').email('invaild email').required('the email is required'),
        phone: Yup.string('please enter phone valid').matches(/^01[0125][0-9]{8}$/, 'invalid phone').required('the phone is required'),
        password: Yup.string('please enter password valid').matches(/^[A-Za-z0-9!@#$%&]{3,15}$/, 'invalid password').required('the password is required'),
        rePassword: Yup.string('please enter Repassword valid').oneOf([Yup.ref('password')], 'Password does\'t match').required('the Repassword is required')
    })
    let formik = useFormik({
        initialValues: {
            "name": "",
            "email": "",
            "password": "",
            "rePassword": "",
            "phone": ""
        },
        validationSchema,
        onSubmit: signupSubmit

    })
    return <>
    <Helmet>
        <title>Sign up</title>
    </Helmet>
        {loading ? <Loading /> : ''}
        <h1 style={{ color: '#2C504C' }} className='my-5 fw-bolder fs-1'><span className='text-main'>S</span>ign <span className='text-main'>u</span>p</h1>
        <div className="row pb-5 w-75 m-auto" style={loading?{ cursor:'wait'}:{cursor:'auto'}}>
            {error ? <div className="alert text-danger">* {error}</div> : ''}
            <div className="col-md-6 pe-5">
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group d-flex justify-content-center align-items-center position-relative mb-3">
                        <label htmlFor="userName" className={`${Style.icon} position-absolute`}>
                            <i className="fa-regular fa-user text-main"></i>
                        </label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} name='name' type="text" id='userName' className={`${Style.inp} form-control ps-5`} placeholder='user name' />
                    </div>
                    {formik.errors.name && formik.touched.name ? <div className="alert text-danger">* {formik.errors.name}</div> : ''}

                    <div className="form-group d-flex justify-content-center align-items-center position-relative mb-3">
                        <label htmlFor="phone" className={`${Style.icon} position-absolute`}>
                            <i className="fa-solid fa-mobile-screen text-main"></i>
                        </label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} name='phone' type="tel" id='phone' className={`${Style.inp} form-control ps-5`} placeholder='Mobile phone' />
                    </div>
                    {formik.errors.phone && formik.touched.phone ? <div className="alert text-danger ">* {formik.errors.phone}</div> : ''}

                    <div className="form-group d-flex justify-content-center align-items-center position-relative mb-3">
                        <label htmlFor="email" className={`${Style.icon} position-absolute`}>
                            <i className="fa-solid fa-at text-main"></i>
                        </label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete='useremail' value={formik.values.email} name='email' type="text" id='email' className={`${Style.inp} form-control ps-5`} placeholder='Email' />
                    </div>
                    {formik.errors.email && formik.touched.email ? <div className="alert text-danger ">* {formik.errors.email}</div> : ''}

                    <div className="form-group d-flex justify-content-center align-items-center position-relative mb-3">
                        <label htmlFor="password" className={`${Style.icon} position-absolute`}>
                            <i className="fa-solid fa-lock text-main"></i>
                        </label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} autoComplete="new-password"
                            name='password' type="password" id='password' className={`${Style.inp} form-control ps-5`} placeholder='Password' />
                    </div>
                    {formik.errors.password && formik.touched.password ? <div className="alert text-danger ">* {formik.errors.password}</div> : ''}

                    <div className="form-group d-flex justify-content-center align-items-center position-relative mb-3 ">
                        <label htmlFor="repassword" className={`${Style.icon} position-absolute`}>
                            <i className="fa-solid fa-lock text-main"></i>
                        </label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} autoComplete="new-password"
                            name='rePassword' type="password" id='repassword' className={`${Style.inp} form-control ps-5`} placeholder='Repassword' />
                    </div>
                    {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert text-danger ">* {formik.errors.rePassword}</div> : ''}

                    <button type='submit' disabled={!formik.isValid && !formik.dirty} className=' btn bg-main text-white px-5'>Sign Up</button>

                </form>
            </div>
            <div className="col-md-6 d-flex align-items-center">
                <img src={freshcartCover} alt="freshcartCover" className='w-100 rounded ' />
            </div>
        </div>

    </>
}
