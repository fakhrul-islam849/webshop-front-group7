import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import Notifications from '@components/my-account/notification';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import useAuth from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PageSeo from "@components/seo/page-seo";

export default function Notification() {
  const isLoggedIn = useAuth();
  const router = useRouter();
  if (!isLoggedIn) {
    router.push('/');
  }

  return (
    <>
      <PageSeo
          title="Notification"
          path="/"
      />
      <AccountLayout>
        <Notifications />
      </AccountLayout>
    </>
  );
}

Notification.Layout = Layout;

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
