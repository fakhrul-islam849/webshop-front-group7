import Layout from '@components/layout/layout';
import ShopsPageContent from '@components/diagnostic/group/group-list';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import PageSeo from "@components/seo/page-seo";

export default function DiagostiGroup() {
    return (
        <>
            {/*<PageSeo*/}
            {/*    title="All Diagnostic Test Group List"*/}
            {/*    path="/diagnostic/group"*/}
            {/*/>*/}
            <ShopsPageContent />
        </>
    );
}

DiagostiGroup.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const  openGraphData= {
        'title': 'All Diagnostic Test Group List',
        'path' : '/diagnostic/group',
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
