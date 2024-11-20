import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout/MainLayout';

const Home = lazy(() => import ('../pages/Home'));
const Products = lazy(() => import ('../pages/Products'));
const Categories = lazy(() => import ('../pages/Categories'));
const AboutAs = lazy(() => import ('../pages/AboutAs'));
const Login = lazy(() => import ('../pages/Login'));
const Signup = lazy(() => import ('../pages/Signup'));
const Error = lazy(() => import ('../pages/Error'));
const Cart = lazy(() => import ('../pages/Cart'));
const Wishlist = lazy(() => import ('../pages/Wishlist'));


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: (
        <Suspense fallback="loading please wait...">
            <Home/>
        </Suspense>
       )
      },
      {
        path: 'cart',
        element:
        <Suspense fallback="loading please wait...">
          <Cart/>
        </Suspense>
      },{
        path: 'wishlist',
        element: 
        <Suspense fallback="loading please wait...">
          <Wishlist/>
        </Suspense>
      },
      {
        path: 'categories',
        element:
        <Suspense fallback="loading please wait...">
          <Categories/>
        </Suspense>
      },
      {
        path: 'categories/products/:prefix',
        element:
        <Suspense fallback="loading please wait...">
          <Products/>
        </Suspense>,
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
        element: 
        <Suspense fallback="loading please wait...">
          <AboutAs/>
        </Suspense>
      },
      {
        path: 'login',
        element: 
        <Suspense fallback="loading please wait...">
          <Login/>
        </Suspense>
      },
      {
        path: 'signup',
        element: 
        <Suspense fallback="loading please wait...">
          <Signup/>
        </Suspense>
      }
    ]
  }
]);

export default function AppRouter() {
  return (
    <RouterProvider router={router}/>
  );
}
