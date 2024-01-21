// import Style from  './Home.module.css';
import { Helmet } from 'react-helmet'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import Products from '../Products/Products'

export default function Home() {
    return <>
        <Helmet>
            <title>Home Page</title>
        </Helmet>
        <MainSlider />
        <CategorySlider />
        <Products />
    </>
}
