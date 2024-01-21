// import Style from  './ProductDetails.module.css';
import axios from "axios"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import Loading from '../Loading/Loading'
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
    let { id } = useParams()
    function getProductDetails(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    let { data, isLoading, isError } = useQuery('productDetails', () => getProductDetails(id))
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    let { addToCart, setNumOfCartItems } = useContext(cartContext)
    async function addProductToCart(productId) {
        let response = await addToCart(productId)
        if (response.data.status === 'success') toast.success(response.data.message, { duration: 4000, position: 'top-center', className:'font-sm' })
        else toast.error(response.data.message, { duration: 4000, position: 'top-center', className:'font-sm' })
        localStorage.setItem('cartItems', response.data.numOfCartItems )
        setNumOfCartItems(response.data.numOfCartItems)
    }

    console.log(data?.data.data)
    return <>
        <Helmet>
            <title>{data?.data.data.title.split(' ').slice(0, 2).join(' ')}</title>
        </Helmet>

        {isLoading ? <Loading /> : ''}
        {isError ? <div className="alert alert-danger text-center">we have a problem please try again later</div> :
            <div className="row align-items-center py-5" style={isLoading?{ cursor:'wait'}:{cursor:'auto'}}>
                <div className="col-md-4">
                    <Slider {...settings}>
                        {data?.data.data.images.map((image , index) => <img key={index} src={image} alt={data?.data.data.title} className="w-100" />)}
                    </Slider>
                </div>
                <div className="col-md-8">
                    <h2 className="h5">{data?.data.data.title}</h2>
                    <p>{data?.data.data.description}</p>
                    <h6 className="text-main">{data?.data.data.category.name}</h6>
                    <h6 className="text-main">Price {data?.data.data.price} EGP</h6>
                    <div className="d-flex justify-content-between mt-3">
                        <span>Rating Quantity {data?.data.data.ratingsQuantity}</span>
                        <span>
                            <i className="fa-solid fa-star rating-color"></i> {data?.data.data.ratingsAverage}</span>
                    </div>
                    <button onClick={()=>addProductToCart(data?.data.data._id)} className="btn bg-main text-white w-100 btn-sm mt-3">Add to Cart</button>
                </div>
            </div>}

    </>
}
