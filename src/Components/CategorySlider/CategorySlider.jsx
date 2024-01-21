import Style from  './CategorySlider.module.css';
import axios from "axios"
import { useQuery } from "react-query"
import Slider from "react-slick";
import Loading from "../Loading/Loading";

export default function CategorySlider() {
    function getCategories() {
        return axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
    }
    let { data, isLoading, isError } = useQuery('categories', getCategories)
    var settings = {
        dots: false,
        arrows:false,
        autoplay:true,
        infinite: true,
        speed: 3000,
        slidesToShow: 6,
        slidesToScroll: 1
    };
    console.log(data?.data.data)
    return <>
    <h1 className="h4 mt-5 mb-4 text-muted" >Shop Popular Categories</h1>
        {isLoading? <Loading/> :''}
        {data?.data.data&& !isError ? <Slider {...settings}>
            {data?.data.data.map(category => <div key={category._id}>
                <img key={category._id} src={category.image} height={220}  alt={category.name} className="w-100" />
                <p className={`${Style.mediaFwMs} mt-2 text-center`}>{category.name}</p>
                 </div>)}
        </Slider> : ''}
        
    </>
}
