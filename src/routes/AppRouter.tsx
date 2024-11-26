import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageSuspenseFullback from '../components/feedback/PageSuspenseFullback/PAgeSuspenseFullback';
import MainLayout from '../layouts/MainLayout/MainLayout';
import { ProtuctedRoutes } from '../components/Auth/ProtuctedRoutes';

const Home = lazy(() => import ('../pages/Home'));
const Products = lazy(() => import ('../pages/Products'));
const Categories = lazy(() => import ('../pages/Categories'));
const AboutAs = lazy(() => import ('../pages/AboutAs'));
const Login = lazy(() => import ('../pages/Login'));
const Signup = lazy(() => import ('../pages/Signup'));
const Cart = lazy(() => import ('../pages/Cart'));
const Wishlist = lazy(() => import ('../pages/Wishlist'));
const Profile = lazy(() => import('../pages/Profile'));
import Error from '../pages/Error';



const router = createBrowserRouter([
  {
    path: '/',
    element:(
      <Suspense fallback={
        <div className='flex flex-col items-center'>
          <h5 className='mt-20'>Loading please wait...</h5>
        </div>
      }>
        <MainLayout/>
      </Suspense>
    ),
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: (
        <PageSuspenseFullback>
            <Home/>
        </PageSuspenseFullback>
       )
      },
      {
        path: 'cart',
        element:
        <PageSuspenseFullback>
          <Cart/>
          </PageSuspenseFullback>
      },{
        path: 'wishlist',
        element: 
        <ProtuctedRoutes>
          <PageSuspenseFullback>
            <Wishlist/>
          </PageSuspenseFullback>
        </ProtuctedRoutes>
      },
      {
        path: 'categories',
        element:
        <PageSuspenseFullback>
          <Categories/>
        </PageSuspenseFullback>
      },
      {
        path: 'categories/products/:prefix',
        element:
        <PageSuspenseFullback>
          <Products/>
        </PageSuspenseFullback>,
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
        <PageSuspenseFullback>
          <AboutAs/>
        </PageSuspenseFullback>
      },
      {
        path: 'login',
        element: 
        <PageSuspenseFullback>
          <Login/>
        </PageSuspenseFullback>
      },
      {
        path: 'signup',
        element: 
        <PageSuspenseFullback>
          <Signup/>
        </PageSuspenseFullback>
      },{
        path: 'profile',
        element: 
        (<ProtuctedRoutes>
         <PageSuspenseFullback>
           <Profile/>
         </PageSuspenseFullback>
        </ProtuctedRoutes>)
      }
    ]
  }
]);

export default function AppRouter() {
  return (
    <RouterProvider router={router}/>
  );
}
