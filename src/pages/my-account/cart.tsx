import React from 'react';
import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import CartTable from '@components/my-account/cart/cart-table';
// import { useOrdersQuery } from '@framework/order/get-all-orders';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useGetCartsQuery } from 'src/features/cart/cartApi';
import useAuth from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import PageSeo from "@components/seo/page-seo";

// props change to orders.

export default function CartTablePage() {
  const { data: cartData, isLoading } = useGetCartsQuery({});

  const isLoggedIn = useAuth();
  const router = useRouter();
  if (!isLoggedIn) {
    router.push('/');
  }

  //   const isLoading = true;
  //   const data = {
  //     data: [
  //       {
  //         brand_name: 'Test 1',
  //         quantity: '2',
  //         price: 3.12,
  //       },
  //       {
  //         brand_name: 'Test 1',
  //         quantity: '2',
  //         price: 3.12,
  //       },
  //       {
  //         brand_name: 'Test 1',
  //         quantity: '2',
  //         price: 3.12,
  //       },
  //     ],
  //   };
  return (
    <>
      <PageSeo
          title="Cat List"
          path="/"
      />
      <AccountLayout>
        {!isLoading ? (
          <CartTable orders={cartData?.brandData} />
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

      {/* <div className="flex flex-col w-[60%] gap-5 p-2 mx-auto bg-white shadow-md select-none sm:p-4 sm:h-64 rounded-2xl sm:flex-row ">
        <div className="bg-gray-200 h-52 sm:h-full sm:w-72 rounded-xl animate-pulse"></div>
        <div className="flex flex-col flex-1 gap-5 sm:p-2">
          <div className="flex flex-col flex-1 gap-3">
            <div className="w-full bg-gray-200 animate-pulse h-14 rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
          </div>
          <div className="flex gap-3 mt-auto">
            <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-20 h-8 ml-auto bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div> */}
    </>
  );
}

CartTablePage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
