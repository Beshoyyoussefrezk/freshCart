// import Style from  './NotFound.module.css';
import Page404 from '../../Assets/404page.svg'

export default function NotFound() {
    return <>
        <div className="text-center">
            <img src={Page404} alt="Page404" className="w-75" />
        </div>
    </>
}
