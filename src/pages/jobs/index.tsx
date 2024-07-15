/* eslint-disable @next/next/no-img-element */
import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {GetServerSideProps, GetStaticProps} from 'next';
import Divider from '@components/ui/divider';
import Heading from '@components/ui/heading';
import JobList from '@components/jobs/JobList';
import PageSeo from "@components/seo/page-seo";

export default function Jobs() {
  return (
    <>
      {/*<PageSeo*/}
      {/*    title="All Job List"*/}
      {/*    path="/jobs"*/}
      {/*/>*/}
      <Divider />
      <Container className="mx-auto">
        <div className="w-full xl:max-w-[1490px] mx-auto">
          <Heading variant="pageHeading" className="mb-4 lg:mb-6 mt-2">
            Health & Pharma Job Circulars
          </Heading>
          <div className="w-100%">
            <JobList />
          </div>
        </div>
      </Container>
    </>
  );
}

Jobs.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const  openGraphData= {
        'title': 'All Job List',
        'path' : '/jobs',
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
