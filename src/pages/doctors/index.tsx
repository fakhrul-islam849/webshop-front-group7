import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import { DoctorFilter } from '@components/doctor/doctorFilters';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Element } from 'react-scroll';
import SearchTopBar from '@components/doctor/search-top-bar';
import Divider from '@components/ui/divider';
import { BlogGrid } from '@components/doctor-list/blog-grid';
import PageSeo from "@components/seo/page-seo";

export default function Search() {
  return (
    <>
      {/*<PageSeo*/}
      {/*    title="Specialist Doctors List in Bangladesh"*/}
      {/*    path="/doctors"*/}
      {/*/>*/}
      <Divider />
      <Container>
        <Element name="grid" className="flex pb-16 pt-7 lg:pt-7 lg:pb-20">
          <div className="sticky hidden h-full lg:pt-4 shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-16 xl:rtl:pl-16 lg:block w-80 xl:w-96 top-16">
            <DoctorFilter />
          </div>
          <div className="w-full lg:pt-4 lg:ltr:-ml-4 lg:rtl:-mr-2 xl:ltr:-ml-8 xl:rtl:-mr-8 lg:-mt-1">
            <SearchTopBar />
            <BlogGrid />
          </div>
        </Element>
      </Container>
    </>
  );
}

Search.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const  openGraphData= {
    'title': 'Specialist Doctors List in Bangladesh',
    'path' : '/doctors',
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
      openGraphData,
    },
  };
};
