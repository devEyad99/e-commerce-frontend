

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type HeaderCounter = {
  totalQuentity: number,
  svgIcon: React.ReactNode,
  to: string,
  title: string
}

function HeaderCounter({totalQuentity, svgIcon, to, title}: HeaderCounter) {
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
    <div className="flex items-center cursor-pointer" onClick={() => navigate(to)}>
      <div className="relative flex items-center font-bold">
        {svgIcon}
        {totalQuentity > 0 && (
            <div
              className={`bg-cyan-400 h-[22px] w-[22px] rounded-full text-center border border-solid absolute top-[-16px] right-[-5px] text-[12px] ${animate ? 'animate-scale' : ''}`}
            >
              {totalQuentity}
            </div>
          )}
      </div>
      <span className="ml-1 font-bold">{title}</span>
    </div>
  );
}

export default HeaderCounter;
