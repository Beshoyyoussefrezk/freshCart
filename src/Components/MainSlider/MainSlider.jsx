import Style from  './MainSlider.module.css';
import adBanner1 from '../../Assets/mainSlider/ad-banner-1.jpg'
import adBanner2 from '../../Assets/mainSlider/ad-banner-2.jpg'
import slider1 from '../../Assets/mainSlider/slider-image-1.jpeg'
import slider2 from '../../Assets/mainSlider/slider-image-2.jpeg'
import slider3 from '../../Assets/mainSlider/slider-image-3.jpeg'
import Slider from "react-slick";

export default function MainSlider() {
    let sliderImages = [{
        image: slider1,
        Offer: '15%',
        title: 'Best Online Deals, Free Stuff',
        start: '$5.99'
    },
    {
        image: slider2,
        Offer: '35%',
        title: 'Chocozay wafer-rolls Deals',
        start: '$34.99'
    },
    {
        image: slider3,
        Offer: '20%',
        title: 'Cokoladni Kolutici Lasta',
        start: '$5.99'
    }];
    var settings = {
        dots: false,
        arrows: false,
        autoplay: true,
        rtl: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return <>
        <div className="row">
            <div className="col-lg-8">
                <div className="slider mt-5 position-relative">
                    <Slider {...settings}>
                        {sliderImages.map(image => <div key={image.title}>
                            <img src={image.image} alt={image.title} className='w-100  rounded' />
                            <div  className="content-slider p-5 d-flex justify-content-center flex-column  rounded position-absolute w-100 top-0 bottom-0">
                                <p className={`pt-3 ${Style.mediaFwMs}`}>Exclusive Offer
                                    <span style={{ fontSize: ".6rem" }} className='px-2 py-1 rounded bg-danger text-white ms-2'>{image.Offer}</span>
                                </p>
                                <h2 style={{ textShadow: '2px 2px 4px #808080' }} className={`py-4 fw-bolder text-white ${Style.mediaFwMs}`}>{image.title}</h2>
                                <p className={`fw-bolder ${Style.mediaFwMs}`}>Only on this week... Don’t miss</p>
                                <p className={`ps-1 font-sm fw-bold ${Style.mediaFwMs}`}>Start from
                                    <span className='ms-2 text-main'>{image.start}</span>
                                </p>
                            </div>
                        </div>)}
                    </Slider>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="row flex-column ">
                    <div className="col-lg-12">
                        <div className="banner1 position-relative  mt-5">
                            <img src={adBanner1} alt="adBanner1" className='w-100' />
                            <div className="content-banner p-5 rounded position-absolute w-100 top-0 bottom-0">
                                <h3 className={`${Style.mediaFwMs} mb-0 h4 fw-bold text-muted`}>
                                    10% cashback on
                                    <br />
                                    personal care
                                </h3>
                                <p className={`${Style.mediaFwMs} my-3 fw-bold`}>Max cashback: $12</p>
                                <span className={`${Style.mediaFwMs} text-muted fw-bold`}>
                                    Code:
                                    <span className="fw-bold ms-2 text-dark">CARE12</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 pt-3">
                        <div className="banner1 position-relative">
                            <img src={adBanner2} alt="adBanner2" className='w-100' />
                            <div className="content-banner p-5   rounded position-absolute w-100 top-0 bottom-0">
                                <h3 className={`${Style.mediaFwMs} mb-3 h4 fw-bold text-muted`}>
                                    Say yes to
                                    <br />
                                    season's fresh
                                </h3>
                                <span className={`${Style.mediaFwMs} text-muted fw-bold`}>
                                    Refresh your day
                                    <br />
                                    the fruity way
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
