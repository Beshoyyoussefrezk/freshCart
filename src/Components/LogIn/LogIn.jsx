import Style from './LogIn.module.css';
import freshcartCover from '../../Assets/freshcart.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from "../Loading/Loading"
import { tokenContext } from '../../Context/TokenContext';
import { Helmet } from 'react-helmet';

export default function LogIn() {
    let { setToken, setUser } = useContext(tokenContext)
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(false)
    let navigate = useNavigate()
    async function loginSubmit(values) {
        setLoading(true)
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values).catch((err) => {
            setError(err.response.data.message)
            setLoading(false)
        })
        if (data.message === 'success') {
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', data.user.name)
            setToken(data.token)
            setUser(data.user.name)
            navigate('/products')
            setLoading(false)

        }
    }
    let validationSchema = Yup.object({
        email: Yup.string('please enter email valid').email('invaild email').required('the email is required'),
        password: Yup.string('please enter password valid').matches(/^[A-Za-z0-9!@#$%&]{3,15}$/, 'invalid password').required('the password is required'),
    })
    let formik = useFormik({
        initialValues: {
            "email": "",
            "password": ""
        },
        validationSchema,
        onSubmit: loginSubmit

    })
    return <>
        <Helmet>
            <title>Sign in</title>
        </Helmet>
        {loading ? <Loading /> : ''}
        <h1 style={{ color: '#2C504C' }} className='my-5 fw-bolder fs-1'><span className='text-main'>L</span>og <span className='text-main'>I</span>n</h1>
        <div className="row pb-5 w-75 m-auto" style={loading?{ cursor:'wait'}:{cursor:'auto'}}>
            {error ? <div className="alert text-danger">* {error}</div> : ''}
            <div className="col-md-6 pe-5">
                <form onSubmit={formik.handleSubmit}>
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
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} autoComplete="new-password" name='password' type="password" id='password' className={`${Style.inp} form-control ps-5`} placeholder='Password' />
                    </div>
                    {formik.errors.password && formik.touched.password ? <div className="alert text-danger ">* {formik.errors.password}</div> : ''}

                    <button type='submit' disabled={!formik.isValid && !formik.dirty} className=' btn bg-main text-white px-5'>Log In</button>

                </form>
            </div>
            <div className="col-md-6 d-flex align-items-center">
                <img src={freshcartCover} alt="freshcartCover" className='w-100 rounded ' />
            </div>
        </div>

    </>
}
