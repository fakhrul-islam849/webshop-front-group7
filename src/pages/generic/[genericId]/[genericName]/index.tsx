import Layout from '@components/layout/layout';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Container from '@components/ui/container';
import Heading from '@components/ui/heading';
import { useRouter } from 'next/router';
import GenericDetails from '@components/GenericDetails/GenericDetails';
import AvailableBrandList from '@components/Brand/AvailableBrandList';
import {paramToString, stringToParam} from '@utils/helperFunction';
import {useGetOnlyGenericDetailsByIdQuery} from 'src/features/generic/genericApi';
import React from "react";
import PageSeo from "@components/seo/page-seo";
import BannerCard from '@components/card/banner-card';
import Link from "@components/ui/link";

export default function ErrorPage() {
  const {
    query: { genericName, genericId },
  } = useRouter();

  const { data, isLoading, isSuccess } = useGetOnlyGenericDetailsByIdQuery(genericId);

  let pdfButton = 'hidden';
  if(data?.generic.innovators_monograph && data?.generic.innovators_monograph != 'null'){
     pdfButton = 'visible';
  }
  return (
    <>
      {/*<PageSeo*/}
      {/*    title={`${paramToString(genericName)} | Indications, Pharmacology, Dosage, Side Effects`}*/}
      {/*    path={`/generic/${genericId}/${genericName}`}*/}
      {/*/>*/}
      <Container className="mx-auto">
        <div className="w-full xl:max-w-[1490px] mx-auto">
          <div className="w-100%">
              {!isLoading && (
                  <div className="flex flex-wrap bg-brand-light w-full">
                    <div className="w-full md:w-[58%] xl:w-[60%] md:ltr:pr-8 md:rtl:pl-8 lg:ltr:pr-0 lg:rtl:pl-0 2xl:rtl:pl-24 lg:mb-0 mb-8">
                      <Heading variant="pageHeading" className="mb-2 lg:mb-4">
                        {data?.generic.name}
                      </Heading>
                      <div className="text-sm mb-2">
                        Medicine Type:&nbsp;
                          {data?.generic.medicine_type==1 &&(
                        <span className="text-teal-900">Allopathic</span>
                        )}{data?.generic.medicine_type== 2 &&(
                        <span className="text-teal-900">Herbal</span>
                        )}
                        &nbsp;
                          {data?.generic.prescription_status==0 &&(
                        <span className="text-cyan-900"> | Prescription (Not Recommended)</span>
                        )}
                          {data?.generic.prescription_status==1 &&(
                        <span className="text-amber-900"> | Prescription (Recommended)</span>
                        )}
                        &nbsp;&nbsp;&nbsp;
                        {data?.generic.otc==1 &&(<span className="text-orange-900">OTC</span>)}
                        {data?.generic.narcotics==1 &&(<span className="text-red-700"> | Narcotics</span>)}
                        {data?.generic.antibiotic==1 &&(<span className="text-red-900"> | Antibiotic</span>)}
                      </div>
                      {data.combination.length > 0 && (
                          <div className="flex flex-wrap gap-2 pb-4">
                              <div className="text-sm">Other Combinations:</div>
                                  {data.combination?.map((item:any) => (
                                      // eslint-disable-next-line react/jsx-key
                                    <div className="text-sm">
                                      <Link
                                        href={`/generic/${item.id}/${stringToParam(item.name)}`}
                                        className="text-sm font-semibold px-2 py-1 w-fit text-brand-tree cursor-pointer ring-2 ring-brand-tree rounded-sm hover:bg-brand-tree hover:text-brand-light"
                                        >
                                          {item.name}
                                      </Link>
                                     </div>
                                  ))}
                          </div>
                       )}
                      <GenericDetails genericId={Number(genericId)} pdfLocation={data?.generic.innovators_monograph} pdfButton={pdfButton} />
                    </div>
                    <div className="w-full md:w-[42%] xl:w-[40%] pb-0.5 lg:ltr:pl-12 lg:rtl:pr-12 pt-1.5">
                      {data?.allAds.length > 0 &&(
                          <div className="flex flex-col mb-1">
                            <BannerCard
                            className="w-[100%]"
                            banner={data?.allAds[0]}
                            effectActive={true}
                            />
                          </div>
                      )}
                          <AvailableBrandList />
                    </div>
                  </div>
              )}
          </div>
        </div>
      </Container>
    </>
  );
}

ErrorPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale , params}) => {
  const  openGraphData= {
    'title': `${paramToString(params?.genericName)} Indications, Pharmacology, Dosage, Side Effects`,
    'path' : `/generic/${params?.genericId}/${params?.name}`,
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
