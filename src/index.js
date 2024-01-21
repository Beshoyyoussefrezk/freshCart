import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import TokenContextProvider from './Context/TokenContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <TokenContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </TokenContextProvider>.
    <Toaster/>
    <ReactQueryDevtools initialIsOpen='false' position='bottom-right' />
  </QueryClientProvider>
);

