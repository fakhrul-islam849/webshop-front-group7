import Layout from '@components/layout/layout';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ErrorInformation from '@components/404/error-information';
import PageSeo from '@components/seo/page-seo';

export default function ErrorPage() {
  return (
    <>
      <PageSeo
        title="404"
        path="/404"
      />
      <ErrorInformation />
    </>
  );
}

ErrorPage.Layout = Layout;

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
