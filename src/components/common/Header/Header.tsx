

import { NavLink } from "react-router-dom";
import { HeaderBasket, HeaderWishlist } from '../../eCommerce';

const Header = () => {
  return (
    <header>
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-inherit no-underline text-4xl m-2 flex-1">
          <h1 className="m-0 flex">
            <span className="block mr-1">our</span>
            <span className="block mr-1 bg-blue-500 text-white rounded px-2">Ecom</span>
          </h1>
        </div>

        {/* Cart and Wishlist */}
        <div className="flex-1 flex justify-end items-center space-x-6">
          <HeaderWishlist />
          <HeaderBasket />
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-900 rounded-[10px] text-white max-w-screen-lg mx-auto flex justify-between items-center p-4">
        <div className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-yellow-500 hover:text-yellow-400" : "hover:text-gray-400"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? "text-yellow-500 hover:text-yellow-400" : "hover:text-gray-400"
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              isActive ? "text-yellow-500 hover:text-yellow-400" : "hover:text-gray-400"
            }
          >
            About Us
          </NavLink>
        </div>
        <div className="flex space-x-4">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "text-yellow-500 hover:text-yellow-400" : "hover:text-gray-400"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? "text-yellow-500 hover:text-yellow-400" : "hover:text-gray-400"
            }
          >
            Register
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
