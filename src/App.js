import Layout from './Components/Layout/Layout';
import SignUp from './Components/SignUp/SignUp';
import LogIn from './Components/LogIn/LogIn';
import Cart from './Components/Cart/Cart';
import NotFound from './Components/NotFound/NotFound';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import { useContext, useEffect } from 'react';
import { tokenContext } from './Context/TokenContext';
import { cartContext } from './Context/CartContext';
import Address from './Components/Address/Address';
import Orders from './Components/Orders/Orders'
import Cash from './Components/Cash/Cash'
const routers = createHashRouter([
  {
    path: '', element: <Layout />, children: [
      { path: 'freshCart', element: localStorage.getItem('token')? <Home /> : <SignUp /> },
      { path: 'login', element: <LogIn /> },
      { path: 'products', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'address', element: <ProtectedRoute><Address /></ProtectedRoute> },
      { path: 'cash', element: <ProtectedRoute><Cash /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: '*', element: <NotFound /> },
    ]
  }
])


export default function App() {
  let { setToken, setUser } = useContext(tokenContext);
  let { setNumOfCartItems } = useContext(cartContext)

  useEffect(() => {
    if (localStorage.getItem('token')) setToken(localStorage.getItem('token'));
    if (localStorage.getItem('user')) setUser(localStorage.getItem('user'))
    if (localStorage.getItem('cartItems')) setNumOfCartItems(localStorage.getItem('cartItems'))
  }, [setToken, setUser, setNumOfCartItems]);

  return <>
    <RouterProvider router={routers} ></RouterProvider>
  </>
}

