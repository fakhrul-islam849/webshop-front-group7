import Layout from '@components/layout/layout';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Container from '@components/ui/container';
import { useRouter } from 'next/router';
import CategoryGeneric from '@components/drugClass/CategoryGeneric';
import PageSeo from "@components/seo/page-seo";
import { paramToString } from '@utils/helperFunction';

export default function DrugClassSubCategoryGeneric() {
    const {
        query: { subCategoryId, name },
    } = useRouter();
    return (
        <>
            <PageSeo
                title={`Drug Class- ${paramToString(name)}`}
                path={`/drug-classes/${subCategoryId}/${name}`}
            />
            <Container className="mx-auto">
                <CategoryGeneric />
            </Container>
        </>
    );
}

DrugClassSubCategoryGeneric.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, [
                'common',
                'forms',
                'menu',
                'footer',
            ])),
        },
    };
};
