import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
// @ts-ignore
import { useGetSitePageQuery } from 'src/features/sitePage/sitePageApi';
import { stringToParam } from '@utils/helperFunction';
import PageSeo from '@components/seo/page-seo';

export default function TermsPage() {

    const {
        query: { pageName, pageType },
    } = useRouter();

    const { data, isLoading, isSuccess, isError } =
        useGetSitePageQuery(pageType);

    return (
        <>
            {!isLoading && !isError && (
                <PageSeo
                    title={data.name}
                    path={`/page/${pageType}/${stringToParam(data.name)}`}
                />
            )}
            {/* End of seo */}
            <div className="py-8 lg:py-16 2xl:py-20">
                <Container>
                    {!isLoading && !isError && (
                        <div className="flex flex-col w-full mx-auto max-w-[1200px]">
                            <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">
                                {(data.name)}
                            </h2>
                            <div
                                className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose"
                                dangerouslySetInnerHTML={{
                                    __html: (data.description),
                                }}
                            />
                        </div>
                    )}
                </Container>
            </div>
            <script type="application/ld+json">
                {
                    "@context": "http://schema.org",
                    "@type": "Restaurant",
                    "name": "Fondue for Fun and Fantasy",
                    "description": "Fantastic and fun for all your cheesy occasions",
                    "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 11:30-23:00",
                    "telephone": "+155501003333",
                    "menu": "http://example.com/menu"
                }
            </script>
        </>
    );
}

TermsPage.Layout = Layout;

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
