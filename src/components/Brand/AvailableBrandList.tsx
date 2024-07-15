import Alert from '@components/ui/alert';
import NoDataFound from '@components/ui/no-data-found';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useGetBrandsByGenericIdQuery } from 'src/features/brand/brandApi';
import _ from 'lodash';
import SingleSelect from '../Select/SingleSelect';
import SingleBrand from './SingleBrand';
import { paramToString, stringToParam } from '@utils/helperFunction';

function AvailableBrandList() {
  const {
    query: { genericId, genericName },
  } = useRouter();

  const [companyId, setCompanyId] = useState(null);

  const { data, isLoading, isSuccess, isError } =
    useGetBrandsByGenericIdQuery(genericId);

  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = (
      <div className="w-100 m-auto">
        <Alert message="There was an error occured" />
      </div>
    );

  if (!isLoading && !isError && data?.brand?.length > 0) {
    const filterData = _.filter(data?.brand, (item) =>
      companyId != null ? item.pharmaceutical_id == companyId : item
    );

    content = filterData
      .slice(0, 18)
      .map((item: any) => <SingleBrand key={item.id} item={item} />);
  }

  if (!isLoading && !isError && data?.brand?.length === 0) {
    content = (
      <div className="w-100 m-auto">
        <NoDataFound />
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-row justify-between">
        <div className="">Available Brand Names</div>
        <Link
          href={`/generic/${genericId}/${stringToParam(genericName)}/brand-name`}
        >
          <div className="text-sm font-semibold px-5 py-2  w-fit text-brand-tree cursor-pointer ring-2 ring-brand-tree rounded-sm hover:bg-brand-tree hover:text-brand-light">
            View Details
          </div>
        </Link>
      </div>
      <div className="">
        {!isLoading && (
          <SingleSelect
            options={data?.company}
            setValue={setCompanyId}
            placeHolder="Select Company"
          />
        )}
      </div>
      <div className="text-center py-2 m-auto w-full flex gap-2 flex-wrap s: w-100">
        {content}
      </div>
    </div>
  );
}

export default AvailableBrandList;
