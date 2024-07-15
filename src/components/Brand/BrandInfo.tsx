import Heading from '@components/ui/heading';
import React, {useEffect} from 'react';
import Link from '@components/ui/link';
import {paramToString, stringToParam} from '@utils/helperFunction';
import CampaignIcon from '@mui/icons-material/Campaign';
import {IconButton} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AuthMenu from "@components/layout/header/auth-menu";
import {useModalAction} from "@components/common/modal/modal.context";
import {useDispatch, useSelector} from "react-redux";
import useAuth from "../../hooks/useAuth";
import {useAddToCartMutation} from "../../features/cart/cartApi";
import {useAddToFavoriteMutation, useRemoveFromFavoriteMutation} from "../../features/favourite/favouriteApi";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {getAllFavoriteIds} from "../../features/favourite/favouriteSlice";
import BannerCard from '@components/card/banner-card';

type BrandInfoProps = {
  info: any;
};
const BrandInfo: React.FC<BrandInfoProps> = ({ info }) => {
  const { id, name, unit_price, strength, package_info, package_info2, package_info3, package_info4, package_info5, medicine_type, medicine_for, current_production, innovator, generic_id, generic, pharmaceutical, dosage_type } =
    info.brand || {};

  const { id:genericId, name: genericName, otc, narcotics, antibiotic, prescription_status, innovators_monograph } = generic || {};
  const { id:pharmaceuticalId, name: pharmaceuticalName } = pharmaceutical || {};
  const { name:dosageName ,icon } = dosage_type || {};
    const speakName = () => {
        let utterance = new SpeechSynthesisUtterance(name);
        speechSynthesis.speak(utterance);
    }

    const dispatch = useDispatch();
    const isLoggedIn = useAuth();
    const { openModal } = useModalAction();
    function handleLogin() {
        openModal('LOGIN_VIEW');
    }
    const [adToCart] = useAddToCartMutation();
    const [adToFavoriteApi] = useAddToFavoriteMutation();
    const [removeFromFavoriteApi] = useRemoveFromFavoriteMutation();

    const allFavoriteIds = useSelector(getAllFavoriteIds);
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
    <div className="mt-5 mb-5">
        <div className="grid md:grid-cols-12 xl:grid-cols-12 gap-4" >
            <div className="md:col-span-6 sm:col-span-full">
                <div className="flex flex-row gap-4 mb-3">
                    <div>
                        <img
                            src={
                                icon
                                    ? `${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${icon}`
                                    : 'https://dummyimage.com/21x21/ffffff/000000.png'
                            }
                            className="mt-1"
                            style={{height:25, width:25}}
                            alt={dosageName}
                        />
                    </div>
                    <div>
                        <h1>
                            <span className="font-bold text-2xl">{name}</span> {dosageName}
                        </h1>
                    </div>
                    <div>
                        <span>
                            {medicine_for==2 &&(
                                <span className="text-base rounded-sm px-2 py-1 bg-orange-500 text-white">Veterinary</span>
                            )}
                        </span>
                        &nbsp;
                        <span>
                            {innovator==1 &&(
                                <span className="text-base rounded-sm px-2 py-1 bg-green-600 text-white">Innovator Brand</span>
                            )}
                        </span>
                    </div>
                    {prescription_status==1 &&(
                        <div>
                            <img
                                src="/assets/images/rx.jpg"
                                width="30px"
                                alt="Prescription"
                            />
                        </div>
                    )}
                    <span><CampaignIcon  onClick={speakName} /></span>
                </div>
                <div className="text-base" title={`Generic Name`}>
                    <Link
                        href={`/generic/${genericId}/${stringToParam(genericName)}`}
                        className="text-blue-900 hover:text-yellow-900"
                    >
                        {genericName}
                    </Link>
                </div>
                {strength!=null &&(<div className="text-base" title={`Strength`}>{strength}</div>)}
                <div className="text-base" title={`Pharmaceutical`}>
                    <Link
                        href={`/companies/${pharmaceuticalId}/${stringToParam(pharmaceuticalName)}/brand`}
                        className="text-blue-900 hover:text-yellow-900"
                    >
                        {pharmaceuticalName ? pharmaceuticalName : 'Not Found'}
                    </Link>
                </div>
                {info.mfgName!=null &&(
                    <div className="text-base" title={`Manufactured By`}>MFG by:&nbsp;
                        <Link
                            href={`/companies/${info.mfgName.id}/${stringToParam(info.mfgName.name)}`}
                            className="text-blue-900 hover:text-yellow-900"
                        >
                                {info.mfgName.name}
                        </Link>
                    </div>
                )}
                <div className="flex flex-col space-y-1">
                    {package_info &&(
                        <div className="text-base">
                            {package_info}
                        </div>
                    )}
                    {package_info2 &&(
                        <div className="text-base">
                            {package_info2}
                        </div>
                    )}
                    {package_info3 &&(
                        <div className="text-base">
                            {package_info3}
                        </div>
                    )}
                    {package_info4 &&(
                        <div className="text-base">
                            {package_info4}
                        </div>
                    )}
                    {package_info5 &&(
                        <div className="text-base">
                            {package_info5}
                        </div>
                    )}

                    <div className="text-base">
                        {current_production==0 &&(
                            <span className="text-base">Currently Production Off</span>
                        )}
                    </div>
                    <div className="text-base">
                        {otc==1 &&(<span className="text-red-900">OTC</span>)}
                        {narcotics==1 &&(<span className="text-red-900"> | Narcotics</span>)}
                        {antibiotic==1 &&(<span className="text-red-900"> | Antibiotic</span>)}
                    </div>
                    <div className="flex flex-row gap-4 mb-0">
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
                        {/*    For Favourite button*/}
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
                    {info.alsoAvailable.length > 0 && (
                        <div className="flex flex-wrap gap-2 pb-4">
                            <div className="text-sm">Also Available:</div>
                            {info.alsoAvailable?.map((item:any) => (
                                <div className="text-sm pb-1">
                                    <Link
                                        href={`/brand/${item.id}/${stringToParam(item.name.replace(/[^a-zA-Z0-9. ]/g, ''))}`}
                                        className="text-sm font-semibold px-2 py-1 w-fit text-brand-tree cursor-pointer ring-2 ring-brand-tree rounded-sm hover:bg-brand-tree hover:text-brand-light"
                                    >
                                        {item.strength} ({item.dosage_type.name})
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex flex-wrap gap-4">
                        <div className="text-sm sm:mb-2">
                            <Link
                                href={`/generic/${generic_id}/${stringToParam(genericName)}/brand-name`}
                                className="text-sm font-semibold px-5 py-2 w-fit text-brand-tree cursor-pointer ring-2 ring-brand-tree rounded-sm hover:bg-brand-tree hover:text-brand-light"
                            >
                                Alternative Brand List
                            </Link>
                        </div>
                        {innovators_monograph && innovators_monograph!='null' && (
                            <div className="text-sm">
                                <a
                                    href={`${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${innovators_monograph}`}
                                    target="_blank"
                                    className="text-sm font-semibold px-5 py-2  w-fit text-brand-tree cursor-pointer ring-2 ring-brand-tree rounded-sm hover:bg-brand-tree hover:text-brand-light" rel="noreferrer"
                                >
                                    Innovators Monograph
                                </a>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            {info?.allAds.length > 0 && (
                <div className="md:col-span-6 sm:col-span-full">
                    <div className="float-right text-center py-1 m-auto w-full flex flex-row-reverse gap-2 flex-wrap s: w-100">
                        <BannerCard
                            className="w-[90%]"
                            banner={info?.allAds[0]}
                            effectActive={true}
                        />
                    </div>
                </div>
            )}
        </div>


    </div>
  );
};

export default BrandInfo;
