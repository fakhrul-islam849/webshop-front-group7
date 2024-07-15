import Layout from '@components/layout/layout';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Container from '@components/ui/container';
import { useRouter } from 'next/router';
import BrandDetails from '@components/Brand/BrandDetails';
import PageSeo from "@components/seo/page-seo";
import {paramToString, stringToParam} from '@utils/helperFunction';
export default function BrandDetailsInfo(seoData: any) {
  const {
    query: { brandId, brandName },
  } = useRouter();

  return (
    <>
      {/*<PageSeo*/}
      {/*    title={`${name} | ${strength} | ${dosageName}|${pharmaceuticalName} | Indications, Pharmacology, Dosage, Side Effects`}*/}
      {/*    path={`/brand/${brandId}/${brandName}`}*/}
      {/*/>*/}
      <Container className="mx-auto">
        <BrandDetails data={seoData.seoData.data} />
      </Container>
    </>
  );
}

BrandDetailsInfo.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
  const brandId = params?.brandId;
  const api = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/brand/public/get-brand-details/${brandId}`);
  const seoData = await api.json();

  const { name, strength, pharmaceutical, dosage_type } =
  seoData.data.brand || {};

  const { name: pharmaceuticalName } = pharmaceutical || {};
  const { name:dosageName  } = dosage_type || {};

  const openGraphData = {
    'title': `${name} | ${strength} | ${dosageName} | ${pharmaceuticalName} | Indications, Pharmacology, Dosage, Side Effects`,
    'path': `/brand/${brandId}/${stringToParam(name)}`
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
      seoData
    },
  };
};
