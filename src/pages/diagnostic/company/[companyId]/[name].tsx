import Layout from '@components/layout/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import CompanySingleDetails from '@components/diagnostic/company/company-single-details';
import {paramToString} from "@utils/helperFunction";
import PageSeo from "@components/seo/page-seo";
import {useRouter} from "next/router";

export default function ShopDetailsPage() {
    const {
        query: { companyId, name },
    } = useRouter();
    return (
        <>
            {/*<PageSeo*/}
            {/*    title={paramToString(name)}*/}
            {/*    path={`/diagnostic/company/${companyId}/${name}`}*/}
            {/*/>*/}
            <CompanySingleDetails />
        </>
    );
}

ShopDetailsPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {

    const  openGraphData= {
        'title': `${paramToString(params?.name)} | Diagnostic | Company | Test List | Test Price`,
        'path' : `/diagnostic/company/${params?.companyId}/${params?.name}`,
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
