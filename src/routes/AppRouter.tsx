import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout/MainLayout';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Categories from '../pages/Categories';
import AboutAs from '../pages/AboutAs';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Error from '../pages/Error';
import Cart from '../pages/Cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: 'cart',
        element: <Cart/>
      },
      {
        path: 'categories',
        element: <Categories/>,
        
      },
      {
        path: 'categories/products/:prefix',
        element: <Products/>,
        loader: ({ params }) => {
          if (typeof params.prefix !== 'string' || !/^[a-z]+$/i.test(params.prefix as string)) {
            throw new Response('Bad Requset', {
              status: 400,
              statusText: "Not Found"
            });
          }
          return true;
        }
      },
      {
        path: 'about-as',
        element: <AboutAs/>
      },
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'signup',
        element: <Signup/>
      }
    ]
  }
]);

export default function AppRouter() {
  return (
    <RouterProvider router={router}/>
  );
}
