import Alert from '@components/ui/alert';
import NoDataFound from '@components/ui/no-data-found';
import { useRouter } from 'next/router';
import React from 'react';
import { useGetPharmaceuticalByIdQuery } from 'src/features/pharmaceutical/pharmaceuticalApi';
import CompanyInfo from './CompanyInfo';
import CompanyDescription from './CompanyDescription';

function CompanyDetails() {
  const {
    query: { companyId },
  } = useRouter();
  const router = useRouter();
  const { data, isLoading, isSuccess, isError } =
    useGetPharmaceuticalByIdQuery(companyId);

  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = (
      <div className="w-100 m-auto">
        <Alert message="There was an error occured" />
      </div>
    );

  if (!isLoading && !isError && data) {
    content = (
      <>
        <div className="w-full md:w-[42%] xl:w-[40%] md:ltr:pr-8 md:rtl:pl-8 lg:ltr:pr-0 lg:rtl:pl-0 2xl:rtl:pl-24 lg:mb-0 mb-8">
          <div className="block max-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <section className="flex mx-auto">
              <img className="mx-auto" src={`${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${data.logo}`}/>
            </section>
            <CompanyInfo info={data} />
          </div>
        </div>
        <div className="w-full md:w-[58%] xl:w-[60%] pb-0.5 lg:ltr:pl-12 lg:rtl:pr-12 pt-1.5">
          <CompanyDescription info={data} />
        </div>
      </>
    );
  }

  if (!isLoading && !isError && data == undefined) {
    content = (
      <div className="w-100 m-auto">
        <NoDataFound />
      </div>
    );
  }

  return <>{content} </>;
}

export default CompanyDetails;
