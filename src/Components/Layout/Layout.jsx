import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import { Offline } from "react-detect-offline";


export default function Layout() {
    return <>
        <Navbar />
        <div className="container">
            <Outlet></Outlet>
        </div>
        <div>
            <Offline>
                <div style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: '9999999999999999999999' }} className="shadow font-sm bg-white text-dark position-fixed p-3">
                    <i class="fa-solid fa-wifi me-2"></i>
                    You're offline right now. Check your connection.
                </div>
            </Offline>
        </div>

    </>
}
