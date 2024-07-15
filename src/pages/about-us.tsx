import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import PageSeo from '@components/seo/page-seo';
// @ts-ignore
import { useGetAboutUsQuery } from 'src/features/sitePage/sitePageApi';

export default function AboutUs() {
  const { data, isLoading, isSuccess, isError } = useGetAboutUsQuery({});

  return (
    <>
        <PageSeo
          title="About Us"
          path="/about-us"
        />
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
    </>
  );
}

AboutUs.Layout = Layout;

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
