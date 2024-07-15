/* eslint-disable react/no-unknown-property */
import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Heading from '@components/ui/heading';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import AllBrandDosage from '@components/Brand/AllBrandDosage';
import { paramToString } from '@utils/helperFunction';
import PageSeo from "@components/seo/page-seo";

export default function DosageBrand() {
    const {
        query: { dosageId, dosageName },
    } = useRouter();

    return (
        <>
            <PageSeo
                title={`All Brand List for Dosage ${paramToString(dosageName)}`}
                path={`/dosage-forms/${dosageId}/${dosageName}/brand-name`}
            />
            <Container className="mx-auto">
                <div className="w-full xl:max-w-[1490px] mx-auto">
                    <Heading variant="titleLarge" className="mb-4 lg:mb-6">
                        {paramToString(dosageName)}
                    </Heading>
                    <div className="w-100%">
                        <AllBrandDosage />
                    </div>
                </div>
            </Container>
        </>
    );
}

DosageBrand.Layout = Layout;

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
