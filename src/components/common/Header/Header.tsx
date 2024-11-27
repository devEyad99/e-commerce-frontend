import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { actGetWishlist } from "../../../store/wishlist/wishlistSlice";
import { authLogout } from "../../../store/auth/authSlice";
import HeaderLiftBar from "./HeaderLiftBar/HeaderLiftBar";

const Header = () => {
  const dispatch = useAppDispatch();
  const {accessToken, user} = useAppSelector((state) => state.auth);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    dispatch(actGetWishlist("productsIds"));
  }, [dispatch, accessToken]);
  return (
    <header>
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-inherit no-underline text-4xl m-2 flex-1">
          <h1 className="m-0 flex">
            <span className="block mr-1">our</span>
            <span className="block mr-1 bg-blue-500 text-white rounded px-2">eCom</span>
          </h1>
        </div>

        <HeaderLiftBar />
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
          {!accessToken ? <>
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

          </> 
          :
           <>
        
         <div className="relative">
            <button
              onClick={toggleDropdown}
              className="hover:text-gray-400 focus:outline-none"
            >
              {`Welcome ${user?.firstName}`}
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-white text-gray-900 rounded shadow-lg mt-2 py-2">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Profile
                </NavLink>
                <a
                  href="#action/3.2"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Orders
                </a>
                <div className="border-t border-gray-300 my-2"></div>
                <NavLink
                  to="/"
                  onClick={() => dispatch(authLogout())}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </NavLink>
              </div>
            )}
          </div>
          </> }
        </div>
      </nav>
    </header>
  );
};

export default Header;
