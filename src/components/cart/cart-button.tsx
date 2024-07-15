import CartIcon from '@components/icons/cart-icon';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { useGetCartsQuery } from '../../features/cart/cartApi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalCartCount, setCartItems } from 'src/features/cart/cartSlice';
import useAuthCheck from 'src/hooks/useAuthCheck';
type CartButtonProps = {
  className?: string;
  iconClassName?: string;
  hideLabel?: boolean;
  isShowing?: boolean;
};

const CartButton: React.FC<CartButtonProps> = ({
  className,
  iconClassName = 'text-brand-dark text-opacity-40',
  hideLabel,
  isShowing,
}) => {
  const { t } = useTranslation('common');
  const { openDrawer, setDrawerView } = useUI();
  const { totalItems } = useCart();
  function handleCartOpen() {
    setDrawerView('CART_SIDEBAR');
    isShowing;
    return openDrawer();
  }

  const { data, isLoading, isSuccess } = useGetCartsQuery({});
  const dispatch = useDispatch();
  const authChecked = useAuthCheck();

  const cartCount = useSelector(getTotalCartCount);

  useEffect(() => {
    if (isSuccess && data && data?.brandData?.length > 0) {
      dispatch(setCartItems(data.brandData));
    }
  }, [isSuccess, data]);
  return (
    <button
      className={cn(
        'flex items-center justify-center shrink-0 h-auto focus:outline-none transform',
        className
      )}
      onClick={handleCartOpen}
      aria-label="cart-button"
    >
      <div className="relative flex items-center">
        <CartIcon className={cn(iconClassName)} />
        <span className="min-w-[20px] min-h-[20px] p-0.5 rounded-[20px] flex items-center justify-center bg-brand text-brand-light absolute -top-2.5 ltr:left-2.5 rtl:right-2.5 text-10px font-bold">
          {cartCount}
        </span>
      </div>
      {!hideLabel && (
        <span className="text-sm font-normal lg:text-15px text-brand-dark ltr:ml-2 rtl:mr-2">
          {t('text-cart')}
        </span>
      )}
    </button>
  );
};

export default CartButton;
