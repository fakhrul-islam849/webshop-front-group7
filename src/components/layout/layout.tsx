import { useSessionStorage } from 'react-use';
import Image from '@components/ui/image';
// import HighlightedBar from '@components/common/highlighted-bar';
import Countdown from '@components/common/countdown';
import NextNprogress from 'nextjs-progressbar';
import Header from '@components/layout/header/header';
import Footer from '@components/layout/footer/footer';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';
import { useTranslation } from 'next-i18next';
import useAuthCheck from '../../hooks/useAuthCheck';
import { useRouter } from 'next/router';
import {
  useAdVisitorAndClickMutation,
  useGetAllSiteInfoQuery,
  useGetDashboardDataQuery,
  useSiteVisitorCountMutation,
} from '../../features/siteInfo/siteInfoApi';
import { useGetAllHomePageAdQuery } from '../../features/siteAd/siteAdApi';
import { useGetFavoritesQuery } from 'src/features/favourite/favouriteApi';
import { useGetUnseenNotificationIdsQuery } from 'src/features/notifications/notificationApi';
import { useEffect } from 'react';
const Layout: React.FC = ({ children }) => {
  const { data, isLoading } = useGetAllSiteInfoQuery({});
  const { data: dashboard, isLoading: dashboardDataIsLoading } =
    useGetDashboardDataQuery({});
  const { data: adData } = useGetAllHomePageAdQuery({});
  const { t } = useTranslation('common');
  const [highlightedBar, setHighlightedBar] = useSessionStorage(
    'borobazar-highlightedBar',
    'false'
  );
  const authChecked = useAuthCheck();
  const {
    query: { brandId, blogId },
    pathname,
  } = useRouter();
  // console.log('hhh', router.pathname);
  const [siteVisitWithoutAuth] = useSiteVisitorCountMutation();
  const [adVisitorAndCount] = useAdVisitorAndClickMutation();
  useEffect(() => {
    if (!isLoading) {
      if (brandId) {
        siteVisitWithoutAuth({ page: 2, page_content_id: brandId });
      } else if (blogId) {
        siteVisitWithoutAuth({ page: 3, page_content_id: blogId });
      } else {
        if (pathname == '/') {
          siteVisitWithoutAuth({ page: 1 });
          adVisitorAndCount({ type: 1 });
        } else {
          siteVisitWithoutAuth({ page: 4 });
        }
      }
      // console.log(authChecked, 'authChecked');

      // if (authChecked) {
      //   console.log('ffff');

      //   if (brandId) {
      //     siteVisitWithAuth({ page: 2, page_content_id: brandId });
      //   } else if (blogId) {
      //     siteVisitWithAuth({ page: 3, page_content_id: blogId });
      //   } else {
      //     if (pathname == '/') {
      //       siteVisitWithAuth({ page: 1 });
      //     } else {
      //       siteVisitWithAuth({ page: 4 });
      //     }
      //   }
      // } else {

      // }
    }
  }, [pathname, isLoading, authChecked]);

  // Global
  const { data: favoroteData } = useGetFavoritesQuery(
    {},
    { skip: authChecked ? false : true }
  );
  const { data: unseenNotificationData } = useGetUnseenNotificationIdsQuery(
    {},
    { skip: authChecked ? false : true }
  );
  // Global

  return isLoading ? (
    <div>
      <NextNprogress />
    </div>
  ) : (
    <div
        // onContextMenu={(e)=> e.preventDefault()}
        className="flex flex-col min-h-screen select-none"
    >
      <Header />
      <main
        className="relative flex-grow"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default Layout;
