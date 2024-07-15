import Layout from '@components/layout/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import GroupSingleDetails from '@components/diagnostic/group/group-single-details';
import {paramToString} from "@utils/helperFunction";
import PageSeo from "@components/seo/page-seo";
import {useRouter} from "next/router";

export default function DiagnosticDetailsPage() {
    const {
        query: { groupId, name },
    } = useRouter();
    return (
        <>
            {/*<PageSeo*/}
            {/*    title={paramToString(name)}*/}
            {/*    path={`/diagnostic/group/${groupId}/${name}`}*/}
            {/*/>*/}
            <GroupSingleDetails />
        </>
    );
}

DiagnosticDetailsPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale , params}) => {

    const  openGraphData= {
        'title': `${paramToString(params?.name)} | Diagnostic | Test Group | Test List | Test Price`,
        'path' : `/diagnostic/company/${params?.groupId}/${params?.name}`,
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
