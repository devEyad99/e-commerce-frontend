

import { useEffect, useState } from 'react';
import Logo from '../../../asset/svg/wishlist.svg?react';
// import { useAppSelector } from '../../../store/categories/hooks';
import { getCartTotalQuentity } from '../../../store/cart/selectors';
import { useNavigate } from 'react-router-dom';

function HeaderWishlist() {
  const totalQuentity = 0;
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!totalQuentity) {
      return;
    }
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 300); // Duration of the animation
    return () => clearTimeout(timeout);
  }, [totalQuentity]);

  return (
    <div className="flex items-center cursor-pointer border-r border-black" onClick={() => navigate('/wishlist')}>
      <div className='mr-5  flex items-center border-sold'> 
      <div className="relative font-bold">
        <Logo title="wishlist icon" />
        {totalQuentity > 0 && (
            <div
              className={`bg-cyan-400 h-[22px] w-[22px] rounded-full text-center border border-solid absolute top-[-16px] right-[-5px] text-[12px] ${animate ? 'animate-scale' : ''}`}
            >
              {totalQuentity}
            </div>
          )}
      </div>
      <span className="font-bold">Wishlist</span>
     </div>
    </div>
  );
}

export default HeaderWishlist;
