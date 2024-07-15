import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Category from '@components/blog-category/Category';
import PageSeo from "@components/seo/page-seo";

export default function BlogCategory() {
    return (
        <>
            <PageSeo
                title="All Blog Category"
                path="/blog-category"
            />
            <Container>
                    <div className="flex flex-col w-full mx-auto max-w-[1200px]">
                        <h2 className="font-bold text-xl">Blog Category List</h2>
                        <Category/>
                    </div>
            </Container>
        </>
    );
}

BlogCategory.Layout = Layout;

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
