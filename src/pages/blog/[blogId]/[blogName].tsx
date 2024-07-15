import Layout from '@components/layout/layout';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import Heading from '@components/ui/heading';
import { useRouter } from 'next/router';
import BlogDetails from '@components/blog/BlogDetails';
import React from "react";
import {paramToString, stringToParam} from '@utils/helperFunction';

export default function BrandDetailsInfo(seoData:any) {
    const {
        query: { blogId, blogName },
    } = useRouter();

    const data = seoData.seoData.data;

    return (
        <>
            <Seo
                title={`${data.blog.name} | Blog`}
                description={data.blog.meta_description}
                path={`/blog/${blogId}/${blogName}`}
                keyword={data.blog.meta_keyword}
                image={`${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${data.blog.image}`}
            />
            <Container className="mx-auto">
                <BlogDetails data={seoData.seoData.data} />
            </Container>
        </>
    );
}

BrandDetailsInfo.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
    const blogId = params?.blogId;
    const api = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/blog/details/${blogId}`);
    const seoData = await api.json();

    const openGraphData = {
        'title': `${seoData.data.blog.name} | Blog`,
        'description': seoData.data.blog.meta_description,
        'path': `/blog/${blogId}/${stringToParam(seoData.data.blog.name)}`,
        'keyword': seoData.data.blog.meta_keyword,
        'image': `${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${seoData.data.blog.image}`
    };
    return {
        props: {
            ...(await serverSideTranslations(locale!, [
                'common',
                'forms',
                'menu',
                'footer',
            ])),
            seoData,
            openGraphData
        },
    };
};
