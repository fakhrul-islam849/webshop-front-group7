/* eslint-disable @next/next/no-img-element */
import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { IoIosCloseCircle } from 'react-icons/io';
import { useCart } from '@contexts/cart/cart.context';

import { ROUTES } from '@utils/routes';
import Counter from '@components/ui/counter';
import { stringToParam } from '@utils/helperFunction';
import {
  useAddToCartMutation,
  useDecrementToCartMutation,
} from 'src/features/cart/cartApi';

type CartItemProps = {
  item: any;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const {
    name,
    unit_price,
    strength,
    generic,
    pharmaceutical,
    dosage_type,
    id,
    quantity,
  } = item || {};
  const { name: genericName, id: genericId } = generic || {};
  const { name: pharmaceuticalName } = pharmaceutical || {};
  const { icon } = dosage_type || {};
  const { clearItemFromCart } = useCart();
  const totalPrice = Number(unit_price) * Number(quantity);
  const [adToCart] = useAddToCartMutation();
  const [removeFromCart] = useDecrementToCartMutation();
  const cartIncrement = (item: any) => {
    adToCart({ brand_id: item.id });
  };
  const removeToCart = (item: any) => {
    removeFromCart({ brand_id: item.id });
  };
  return (
    <div
      className={`group w-full h-auto flex justify-start items-center text-brand-light py-4 md:py-7 border-b border-border-one border-opacity-70 relative last:border-b-0`}
      title={name ? name : 'Unknown'}
    >
      <div className="relative flex rounded overflow-hidden shrink-0 cursor-pointer w-[30px] md:w-[30px] h-[30px] md:h-[30px]">
        <img
          alt="common:text-logo"
          src={
            icon
              ? `${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${icon}`
              : 'https://dummyimage.com/21x21/ffffff/000000.png'
          }
        />
        <div
          className="absolute top-0 flex items-center justify-center w-full h-full transition duration-200 ease-in-out bg-black ltr:left-0 rtl:right-0 bg-opacity-30 md:bg-opacity-0 md:group-hover:bg-opacity-30"
          onClick={() => clearItemFromCart(item.id)}
          role="button"
        >
          <IoIosCloseCircle className="relative text-2xl text-white transition duration-300 ease-in-out transform md:scale-0 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="ltr:pl-3 rtl:pr-3 md:ltr:pl-4 md:rtl:pr-4">
          <Link
            href={`/brand/${id}/${stringToParam(name)}`}
            className="block leading-5 transition-all text-brand-dark text-13px sm:text-sm lg:text-15px hover:text-brand"
          >
            {name ? name : 'Un known'}
          </Link>
          <div className="text-13px sm:text-sm text-brand-muted mt-1.5 block mb-2">
            {Number(unit_price)} X {Number(quantity)}
          </div>
          <Counter
            value={quantity}
            onIncrement={() => cartIncrement(item)}
            onDecrement={() => removeToCart(item)}
            variant="cart"
          />
        </div>

        <div className="flex font-semibold text-sm md:text-base text-brand-dark leading-5 shrink-0 min-w-[65px] md:min-w-[80px] justify-end">
          {totalPrice}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
