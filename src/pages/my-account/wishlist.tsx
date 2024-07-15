import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import useAuth from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import { useGetFavoritesForTableQuery } from 'src/features/favourite/favouriteApi';
import FavoriteTable from '@components/my-account/cart/favorite-table';
import PageSeo from "@components/seo/page-seo";

export default function LegalNotice() {
  const isLoggedIn = useAuth();
  const router = useRouter();
  if (!isLoggedIn) {
    router.push('/');
  }

  const { data: cartData, isLoading } = useGetFavoritesForTableQuery({});
  return (
    <>
      <PageSeo
          title="Wishlist"
          path="/"
      />
      <AccountLayout>
        {!isLoading ? (
          <FavoriteTable orders={cartData?.brandData} />
        ) : (
          <div className="flex flex-col flex-1 gap-3">
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
          </div>
        )}
      </AccountLayout>
    </>
  );
}

LegalNotice.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
