import Layout from '@components/layout/layout';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Container from '@components/ui/container';
import { useRouter } from 'next/router';
import BlogList from '@components/blog-category/BlogList';
import PageSeo from "@components/seo/page-seo";
import { paramToString } from '@utils/helperFunction';

export default function ErrorPage() {
    const {
        query: { blogCategoryId, name },
    } = useRouter();
    return (
        <>
            <PageSeo
                title={`All Blog for Category ${paramToString(name)}`}
                path={`/blog-category/${blogCategoryId}/${name}`}
            />
            <Container className="mx-auto">
                <BlogList />
            </Container>
        </>
    );
}

ErrorPage.Layout = Layout;

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
