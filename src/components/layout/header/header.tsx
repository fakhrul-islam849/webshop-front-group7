import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import { useUI } from '@contexts/ui.context';
import { siteSettings } from '@settings/site-settings';
import { addActiveScroll } from '@utils/add-active-scroll';
import Container from '@components/ui/container';
import Logo from '@components/ui/logo';
import HeaderMenu from '@components/layout/header/header-menu';
import Search from '@components/common/search';
// import LanguageSwitcher from '@components/ui/language-switcher';
import UserIcon from '@components/icons/user-icon';
import SearchIcon from '@components/icons/search-icon';
import { useModalAction } from '@components/common/modal/modal.context';
import useOnClickOutside from '@utils/use-click-outside';
import CustomModal from '../../Modal/CustomModal';
// import Delivery from '@components/layout/header/delivery';
const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false });
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});
import Translate from '../translate';
import { useRouter } from 'next/router';
import LoginForm from '@components/auth/login-form';
import useAuth from '../../../hooks/useAuth';

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const {
    displaySearch,
    displayMobileSearch,
    openSearch,
    closeSearch,
    isAuthorized,
  } = useUI();
  const { openModal } = useModalAction();
  const siteHeaderRef = useRef() as DivElementRef;
  const siteSearchRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef, 40);
  useOnClickOutside(siteSearchRef, () => closeSearch());
  const isLoggedIn = useAuth();

  function handleLogin() {
    // router.push({
    //   pathname: '/contact-us',
    // });
    openModal('LOGIN_VIEW');
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn(
        'header-two sticky-header sticky top-0 z-20 lg:relative w-full h-16 lg:h-auto',
        displayMobileSearch && 'active-mobile-search'
      )}
    >
      <div className="z-20 w-screen transition-all duration-200 ease-in-out innerSticky lg:w-full body-font bg-fill-secondary">
        <Search
          searchId="mobile-search"
          className="top-bar-search hidden lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-1"
        />
        {/* End of Mobile search */}
        <Container className="flex items-center justify-between h-16 py-2 mx-auto top-bar lg:h-auto ">
          <Logo className="-mt-1.5 md:-mt-1" />
          {/* End of logo */}

          <Search
            searchId="top-bar-search"
            className="hidden lg:flex lg:max-w-[650px] 2xl:max-w-[800px] lg:ltr:ml-7 lg:rtl:mr-7 lg:ltr:mr-5 lg:rtl:ml-5"
          />
          {/* End of search */}

          <div className="flex shrink-0 -mx-2.5 xl:-mx-3.5">
            <div className="xl:mx-3.5 mx-2.5"><Translate/></div>
            <CartButton className="hidden lg:flex mx-2.5 xl:mx-3.5" />
            <div className="items-center hidden lg:flex shrink-0 mx-2.5 xl:mx-3.5">
              <UserIcon className="text-brand-dark text-opacity-40" />
              <AuthMenu
                isAuthorized={isLoggedIn}
                href={ROUTES.ACCOUNT}
                btnProps={{
                  children: t('text-sign-in'),
                  onClick: handleLogin,
                }}
              >
                {t('text-account')}
              </AuthMenu>
            </div>
          </div>
          {/* End of auth & lang */}
        </Container>
        {/* End of top part */}

        <div className="hidden navbar bg-brand-light lg:block">
          <Container className="flex items-center justify-between h-16">
            <Logo className="w-0 transition-all duration-200 ease-in-out opacity-0 navbar-logo" />
            {/* End of logo */}

            <HeaderMenu
              data={site_header.menu}
              className="flex transition-all duration-200 ease-in-out"
            />
            {/* End of main menu */}

            {displaySearch && (
              <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full px-4 sticky-search">
                <Search
                  ref={siteSearchRef}
                  className="max-w-[780px] xl:max-w-[830px] 2xl:max-w-[1000px]"
                />
              </div>
            )}
            {/* End of conditional search  */}

            <div className="flex items-center ltr:ml-auto rtl:mr-auto shrink-0">
              {/* <Delivery /> */}
              <div className="flex items-center w-0 py-4 overflow-hidden transition-all duration-200 ease-in-out opacity-0 navbar-right">
                <button
                  type="button"
                  aria-label="Search Toggle"
                  onClick={() => openSearch()}
                  title="Search toggle"
                  className="flex items-center justify-center w-12 h-full transition duration-200 ease-in-out outline-none ltr:mr-6 rtl:ml-6 md:w-14 hover:text-heading focus:outline-none"
                >
                  <SearchIcon className="w-[22px] h-[22px] text-brand-dark text-opacity-40" />
                </button>
                {/* End of search handler btn */}
                
                <CartButton />
                {/* End of cart btn */}

                <div className="flex items-center shrink-0 ltr:ml-7 rtl:mr-7">
                  <UserIcon className="text-brand-dark text-opacity-40" />
                  <AuthMenu
                    isAuthorized={isLoggedIn}
                    href={ROUTES.ACCOUNT}
                    btnProps={{
                      children: t('text-sign-in'),
                      onClick: handleLogin,
                    }}
                  >
                    {t('text-account')}
                  </AuthMenu>
                </div>
                {/* End of auth */}
              </div>
            </div>
          </Container>
        </div>
        {/* End of menu part */}
      </div>
      {/* <CustomModal
        open={open}
        setOpen={setOpen}
        title="Rename Folder"
        size="lg"
      >
        <LoginForm />
      </CustomModal> */}
    </header>
  );
};

export default Header;
