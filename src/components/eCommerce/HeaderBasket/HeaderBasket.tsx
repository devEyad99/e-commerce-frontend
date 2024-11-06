import Logo from '../../../asset/svg/cart.svg?react';

function HeaderBasket() {
  return (
    <div className="pr-[370px] ">
      <div className="relative cursor-pointer self-end">
        <Logo title="basket icon" />
        <div className="bg-cyan-400 h-[22px] w-[22px] rounded-[10px] text-center border border-solid absolute top-[-16px] right-[-5px] text-[12px]">
          0
        </div>
      </div>
    </div>
  );
}

export default HeaderBasket;
