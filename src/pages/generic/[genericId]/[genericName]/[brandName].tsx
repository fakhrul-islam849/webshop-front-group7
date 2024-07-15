/* eslint-disable react/no-unknown-property */
import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Heading from '@components/ui/heading';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import AllBrand from '@components/Brand/AllBrand';
import { paramToString } from '@utils/helperFunction';
import PageSeo from "@components/seo/page-seo";

export default function Allopathic() {
  const {
    query: { genericId, genericName },
  } = useRouter();

  return (
    <>
      <PageSeo
          title={`All Brand List for Generic ${paramToString(genericName)}`}
          path={`/generic/${genericId}/${genericName}/brand-name`}
      />
      <Container className="mx-auto">
        <div className="w-full xl:max-w-[1490px] mx-auto">
          <h2 className="mb-0 font-bold text-2xl text-black">
            {(genericName.replace(/-/g, ' '))}
          </h2>
          <p className="mb-4">Available Brands</p>
          <div className="w-100%">
            <AllBrand />
          </div>
        </div>
      </Container>
    </>
  );
}

Allopathic.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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
