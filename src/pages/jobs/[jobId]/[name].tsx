import Layout from '@components/layout/layout';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Container from '@components/ui/container';
import { useRouter } from 'next/router';
import JobDetails from '@components/jobs/JobDetails';
import {paramToString} from "@utils/helperFunction";

export default function JobDetailsInfo(seoData: any) {
    const {
        query: { jobId, name },
    } = useRouter();
    return (
        <>
            <Container className="mx-auto">
                <JobDetails data={seoData.seoData.data} />
            </Container>
        </>
    );
}

JobDetailsInfo.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
    const api = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/job/details/${params?.jobId}`);
    const seoData = await api.json();

    const  openGraphData= {
        'title': `${seoData.data.job.name} : ${seoData.data.pharmaceutical.name} | Job Details`,
        'description': seoData.data.job.meta_description,
        'keyword': seoData.data.job.meta_keyword,
        'path' : `/jobs/${params?.jobId}/${params?.name}`,
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
