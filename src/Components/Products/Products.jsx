// import Style from  './Products.module.css';
import axios from "axios"
import { useQuery } from "react-query"
import Loading from "../Loading/Loading"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { cartContext } from "../../Context/CartContext"
import toast from "react-hot-toast"


export default function Products() {
    function getProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    let { data, isLoading, isError } = useQuery('products', getProducts, {
        cacheTime: 60000,
        // refetchOnMount:false ,
        // staleTime:3000 , 
        refetchInterval: 30000
    })

    let { addToCart, setNumOfCartItems } = useContext(cartContext)
    async function addProductToCart(productId) {
        let response = await addToCart(productId)
        if (response.data.status === 'success') toast.success(response.data.message, { duration: 4000, position: 'top-center', className:'font-sm' })
        else toast.error(response.data.message, { duration: 4000, position: 'top-center', className:'font-sm' })
        localStorage.setItem('cartItems', response.data.numOfCartItems )
        setNumOfCartItems(response.data.numOfCartItems)
    }
    return <>
        <h1 className="h4 mt-5 text-muted">Our Products</h1>
        {isLoading ? <Loading /> : ''}
        <div className="container py-3" style={isLoading?{ cursor:'wait'}:{cursor:'auto'}}>
            <div className="row">
                {isError ? <div className="alert alert-danger text-center">we have a problem please try again later</div> :
                    data?.data.data.map(product => <div key={product.id} className="col-lg-2 col-md-4">
                        <div className="product cursor-pointer py-3 px-2">
                            <Link to={`/productDetails/${product.id}`}>
                                <img src={product.imageCover} className="w-100" alt={product.title} />
                                <span className="text-main font-sm fw-bold">{product.category.name}</span>
                                <h3 className="h6">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                                <div className="d-flex justify-content-between mt-3">
                                    <span>{product.price} EGP</span>
                                    <span>
                                        <i className="fa-solid fa-star rating-color"></i> {product.ratingsAverage}</span>
                                </div>
                            </Link>
                            <button onClick={() => addProductToCart(product.id)} className="btn bg-main text-white w-100 btn-sm mt-3">Add to Cart</button>
                        </div>
                    </div>)}
            </div>
        </div>
    </>
}
