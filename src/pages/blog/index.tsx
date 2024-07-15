import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import { ShopFilters } from '@components/search/filters';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Element } from 'react-scroll';
import SearchTopBar from '@components/search/search-top-bar';
import Divider from '@components/ui/divider';
import { BlogGrid } from '@components/blog/blog-grid';
import PageSeo from "@components/seo/page-seo";
import Heading from "@components/ui/heading";

export default function Search() {
  return (
    <>
      <PageSeo
          title="All Blog List"
          path="/blog"
      />
      <Divider />
      <Container>
        <Heading variant="pageHeading" className="mb-4 lg:mb-6 mt-2">
          Blog List & Category Filter
        </Heading>
        <Element name="grid" className="flex pb-16 pt-7 lg:pt-7 lg:pb-20">
          <div className="sticky hidden h-full lg:pt-4 shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-16 xl:rtl:pl-16 lg:block w-80 xl:w-96 top-16">
            <ShopFilters />
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
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'about',
        'footer',
      ])),
    },
  };
};
