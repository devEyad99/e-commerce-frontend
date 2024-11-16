

import { useEffect, useState } from 'react';
import Logo from '../../../asset/svg/cart.svg?react';
import { useAppSelector } from '../../../store/categories/hooks';
import { getCartTotalQuentity } from '../../../store/cart/selectors';
import { useNavigate } from 'react-router-dom';

function HeaderBasket() {
  const totalQuentity = useAppSelector(getCartTotalQuentity);
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
    <div className="flex items-center cursor-pointer" onClick={() => navigate('/cart')}>
      <div className="relative flex items-center font-bold">
        <Logo title="basket icon" />
        {totalQuentity > 0 && (
            <div
              className={`bg-cyan-400 h-[22px] w-[22px] rounded-full text-center border border-solid absolute top-[-16px] right-[-5px] text-[12px] ${animate ? 'animate-scale' : ''}`}
            >
              {totalQuentity}
            </div>
          )}
      </div>
      <span className="ml-1 font-bold">Cart</span>
    </div>
  );
}

export default HeaderBasket;
