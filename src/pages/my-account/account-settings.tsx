import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import AccountDetails from '@components/my-account/account-details';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import useAuth from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import PageSeo from "@components/seo/page-seo";

export default function AccountDetailsPage() {
  const isLoggedIn = useAuth();
  const router = useRouter();
  if (!isLoggedIn) {
    router.push('/');
  }
  return (
    <>
      <PageSeo
          title="Account Setting"
          path="/"
      />
      <AccountLayout>
        <AccountDetails />
      </AccountLayout>
    </>
  );
}

AccountDetailsPage.Layout = Layout;

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
