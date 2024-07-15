import Layout from '@components/layout/layout';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PageSeo from '@components/seo/page-seo';
import Container from '@components/ui/container';
import Heading from '@components/ui/heading';
import { useRouter } from 'next/router';
import GenericDetails from '@components/GenericDetails/GenericDetails';
import AvailableBrandList from '@components/Brand/AvailableBrandList';
import CompanyDetails from '@components/company/CompanyDetails';
import { paramToString } from '@utils/helperFunction';

export default function ErrorPage() {
  const {
    query: { companyId, companyName },
  } = useRouter();
  return (
    <>
      {/*<PageSeo*/}
      {/*    title={`${paramToString(companyName)} | Available Brand Names in Bangladesh`}*/}
      {/*    path={`/companies/${companyId}/${companyName}`}*/}
      {/*/>*/}
      <Container className="mx-auto">
        <div className="w-full xl:max-w-[1490px] mx-auto">
          <Heading variant="pageHeading" className="mb-4 lg:mb-6">
            {companyName ? paramToString(companyName) : ''}
          </Heading>

          <div className="w-100%">
            <div className="flex flex-wrap bg-brand-light w-full">
              <CompanyDetails />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

ErrorPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale , params}) => {
  const  openGraphData= {
    'title': `${paramToString(params?.companyName)} | Available Brand Names in Bangladesh`,
    'path' : `/companies/${params?.companyId}/${params?.companyName}`,
  };
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
      openGraphData,
    },
  };
};
