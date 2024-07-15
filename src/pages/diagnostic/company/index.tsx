import Layout from '@components/layout/layout';
import ShopsPageContent from '@components/diagnostic/company/company-list';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import PageSeo from "@components/seo/page-seo";

export default function DiagostiCompany() {
    return (
        <>
            {/*<PageSeo*/}
            {/*    title="All Diagnostic Company List"*/}
            {/*    path="/diagnostic/company"*/}
            {/*/>*/}
            <ShopsPageContent />
        </>
    );
}

DiagostiCompany.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const  openGraphData= {
        'title': 'All Diagnostic Company List',
        'path' : '/diagnostic/company',
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
