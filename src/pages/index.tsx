import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import LivingHealthy from '@components/common/collection-grid';
import BannerGrid from '@components/common/banner-grid';
import CategoryGridBlock from '@components/common/category-grid-block';
import Subscription from '@components/layout/footer/widget/Subscription';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import HeroBanner from '@components/home/HeroBanner';
import HomeSeo from '@components/seo/home-seo';

export default function Home() {
  return (
    <>
      {/*<HomeSeo*/}
      {/*  title={title.content}*/}
      {/*  description={description.content}*/}
      {/*  keyword={keyword.content}*/}
      {/*/>*/}

      <HeroBanner />
      <Container>
        <CategoryGridBlock />
        <BannerGrid
          rowCount={0}
          className="mb-4 lg:mb-6"
        />
        {/*<BannerGrid*/}
        {/*  rowCount={1}*/}
        {/*  className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"*/}
        {/*/>*/}
        <LivingHealthy className="mb-4 lg:mb-6 xl:mb-8" />
        {/*<BannerGrid*/}
        {/*  rowCount={2}*/}
        {/*  className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"*/}
        {/*/>*/}
        <Subscription />
      </Container>
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const api = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/site-information/all-info`);
    const seoData = await api.json();

    const title = seoData?.data?.find((info: any) => info.content_type === 1);
    const description = seoData?.data?.find((info: any) => info.content_type === 3);
    const keyword = seoData?.data?.find((info: any) => info.content_type === 4);

    const openGraphData = {
        'title': `Drugx | ${title.content}`,
        'description': description.content,
        'keyword': keyword.content
    };
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'about',
        'footer',
      ])),
        openGraphData
    },
  };
};
