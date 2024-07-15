/* eslint-disable @next/next/no-img-element */
import Link from '@components/ui/link';
import Heading from '@components/ui/heading';
import { paramToString, stringToParam } from '@utils/helperFunction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AuthMenu from '@components/layout/header/auth-menu';
import { useModalAction } from '@components/common/modal/modal.context';
import { useAddToCartMutation } from 'src/features/cart/cartApi';
import {
  useAddToFavoriteMutation,
  useRemoveFromFavoriteMutation,
} from 'src/features/favourite/favouriteApi';
import FavoriteIcon from '@mui/icons-material/Favorite';

import useAuth from 'src/hooks/useAuth';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  addInFavoriteList,
  getAllFavoriteIds,
  removedFromFavoriteList,
} from 'src/features/favourite/favouriteSlice';
type BrandCardProps = {
  brand?: any;
  className?: any;
};

// {
//     "id": 247,
//     "name": "BstCef",
//     "dosage_type_id": 2,
//     "generic_id": 272,
//     "pharmaceutical_id": 88,
//     "status": 1,
//     "medicine_type": 1,
//     "medicine_for": 1,
//     "current_production": 1,
//     "prescription_status": 1,
//     "unit_price": "12.00",
//     "strength": "500 mg",
//     "package_info": null,
//     "createdAt": "2022-10-20T13:05:06.000Z",
//     "updatedAt": "2022-10-20T13:05:06.000Z"
// }

const BrandCard: React.FC<BrandCardProps> = ({ brand, className='' }) => {
  const placeholderImage = `/assets/placeholder/products/product-grid.svg`;
  const {
    name,
    unit_price,
    strength,
    generic,
    pharmaceutical,
    dosage_type,
    id,
  } = brand || {};
  const { name: genericName, id: genericId } = generic || {};
  const { name: pharmaceuticalName } = pharmaceutical || {};
  const allFavoriteIds = useSelector(getAllFavoriteIds);
  const { name:dosageName, icon } = dosage_type || {};
  const { openModal } = useModalAction();
  const [adToCart] = useAddToCartMutation();
  const [adToFavoriteApi] = useAddToFavoriteMutation();
  const [removeFromFavoriteApi] = useRemoveFromFavoriteMutation();
  function handleLogin() {
    openModal('LOGIN_VIEW');
  }
  const dispatch = useDispatch();
  const isLoggedIn = useAuth();
  const handleAddToCart = (id: any) => {
    adToCart({ brand_id: id });
  };

  const handleAddToFavorite = (id: any) => {
    adToFavoriteApi({ brand_id: id });
  };
  const handleRemoveFromFavorite = (id: any) => {
    removeFromFavoriteApi({ brand_id: id });
    // dispatch(removedFromFavoriteList(id));
  };
  return (
    <div
      // href={`/brand/${id}/${stringToParam(name)}`}
      className={`relative flex items-center px-5 py-5 transition-all bg-white border rounded-lg xl:px-7 xl:py-7 border-border-base shadow-vendorCard hover:bg-sky-100 ${className}`}
    >
      <div className="flex flex-col ltr:ml-1 rtl:mr-1 xl:ltr:ml-5 xl:rtl:mr-5 w-[90%]">
            <Link href={`/brand/${id}/${stringToParam(name)}`}>
              <div className="flex flex-row gap-2">
                <img
                    alt={dosageName}
                    src={
                      icon
                          ? `${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${icon}`
                          : 'https://dummyimage.com/21x21/ffffff/000000.png'
                    }
                />
                <h2 className="font-bold">{paramToString(name)}</h2>
              </div>
              {/* <Text className="xl:leading-6">{address}</Text> */}
              <div className="mt-2 flex flex-col space-y-0">
                <p className="text-sm text-brand-muted mb-0 leading-6">
                  {strength ? strength : 'Not Found'}
                </p>
                <p className="text-sm text-fuchsia-900 leading-6 ">
                  {genericName ? genericName : 'Not Found'}
                </p>
                <p className="text-sm text-brand-muted leading-6">
                  {pharmaceuticalName ? pharmaceuticalName : 'Not Found'}
                </p>
                <p className="text-sm text-pink-900 leading-6">
                  Unit Price: {unit_price}
                </p>
              </div>
            </Link>
      </div>
      <div className="flex flex-col ltr:ml-1 rtl:mr-1 xl:ltr:ml-5 xl:rtl:mr-5 text-right">
        <AuthMenu
          isAuthorized={isLoggedIn}
          btnProps={{
            children: (
              <IconButton sx={{ '&:hover': { color: 'green' } }}>
                <ShoppingCartIcon fontSize="small" />
              </IconButton>
            ),
            onClick: handleLogin,
          }}
        >
          {/* <span
            onClick={(e) => handleAddToCart(id)}
            className="flex items-center justify-center w-8 h-8 text-sm rounded-full hover:bg-brand hover:text-white lg:w-8 lg:h-8 text-brand-dark border-brand-tree border-2  focus:outline-none"
          > */}

          <IconButton
            sx={{ '&:hover': { color: 'green' } }}
            onClick={(e) => handleAddToCart(id)}
          >
            <ShoppingCartIcon fontSize="small" />
          </IconButton>

          {/* </span> */}
        </AuthMenu>
      </div>
      <div className="flex flex-col ltr:ml-1 rtl:mr-1 xl:ltr:ml-5 xl:rtl:mr-5 text-right">
        <AuthMenu
          isAuthorized={isLoggedIn}
          btnProps={{
            children: (
              <IconButton sx={{ '&:hover': { color: '#d32f2f' } }}>
                <FavoriteIcon fontSize="small" />
              </IconButton>
            ),
            onClick: handleLogin,
          }}
        >
          {/* <span
            onClick={(e) => handleAddToCart(id)}
            className="flex items-center justify-center w-8 h-8 text-sm rounded-full hover:bg-brand hover:text-white lg:w-8 lg:h-8 text-brand-dark border-brand-tree border-2  focus:outline-none"
          > */}

          {allFavoriteIds.includes(Number(id)) ? (
            <IconButton
              // sx={{ '&:hover': { color: 'yellow' } }}
              onClick={(e) => handleRemoveFromFavorite(id)}
            >
              <FavoriteIcon fontSize="small" color="error" />
            </IconButton>
          ) : (
            <IconButton
              sx={{ '&:hover': { color: '#d32f2f' } }}
              onClick={(e) => handleAddToFavorite(id)}
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
          )}

          {/* </span> */}
        </AuthMenu>
      </div>
    </div>
  );
};

export default BrandCard;
