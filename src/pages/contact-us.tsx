import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContactForm from '@components/contact/contact-form';
import ContactInformation from '@components/contact/contact-info';
import PageSeo from "@components/seo/page-seo";

export default function ContactUsPage() {
  return (
    <>
      <PageSeo
          title="Contact Us"
          path="/contact-us"
      />
      <Container>
        <div className="max-w-[1420px] mx-auto mb-12 lg:mb-14 xl:mb-16">
          <div className="flex flex-wrap bg-brand-light w-full p-5 md:p-7 lg:p-10 xl:p-16 3xl:px-[70px] xl:py-12 shadow-contact rounded-md -mt-8 relative z-10">
            <div className="w-full md:w-[100%] xl:w-[100%] pb-0.5 lg:ltr:pl-12 lg:rtl:pr-12 pt-1.5">
              <p className="text-red-800 font-bold pb-4">NB: Not available for purchase. You may calculate the desired cost with an updated Price.</p>
              <ContactForm />
            </div>
          </div>
        </div>
        <ContactInformation />
      </Container>

      {/* <DownloadApps /> */}
    </>
  );
}

ContactUsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
