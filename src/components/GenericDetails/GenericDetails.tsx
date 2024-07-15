import DrugDetails from '@components/DrugDetails/DrugDetails';
import DrugDetailsAction from '@components/DrugDetails/DrugDetailsAction';
import Alert from '@components/ui/alert';
import NoDataFound from '@components/ui/no-data-found';
import React, { useEffect, useState } from 'react';
import useSticky from '../../hooks/useSticky';
import {useGetGenericDetailsByIdQuery} from 'src/features/generic/genericApi';
import useWindowSize from '@utils/use-window-size';

type GenericDetailsProps = {
  genericId: number;
  pdfButton: string;
  pdfLocation: string;
};

const GenericDetails: React.FC<GenericDetailsProps> = ({
  genericId, pdfButton, pdfLocation
}) => {
  const { data, isLoading, isSuccess, isError } =
    useGetGenericDetailsByIdQuery(genericId);

  const { width } = useWindowSize();

  const { sticky, stickyRef } = useSticky();

  let content = null;
  let header = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = (
      <div className="w-100 m-auto">
        <Alert message="There was an error" />
      </div>
    );

  if (!isLoading && !isError && data?.genericDetails.length > 0) {
    content = data?.genericDetails.map((item: any, index: any) => (
      <DrugDetails
        key={item.id}
        item={item}
        index={index}
        allAdData={data?.allAds}
      />
    ));
    header = data?.genericDetails.map((item: any) => (
      <DrugDetailsAction key={item.id} item={item} />
    ));
  }

  if (!isLoading && !isError && data?.genericDetails.length === 0) {
    content = (
      <div className="w-100 m-auto">
        <NoDataFound message="No Generic details Found" />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-5 relative">
      <div>
        {!isLoading && !isError && data?.genericDetails.length > 0 && (
          <a
            href={`${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${pdfLocation}`}
            target="_blank"
            className={`visibility: ${pdfButton}`} rel="noreferrer"
          >
            <div className="text-sm font-semibold px-5 py-2  w-fit text-brand-tree cursor-pointer ring-2 ring-brand-tree rounded-sm hover:bg-brand-tree hover:text-brand-light">
              Innovators Monograph
            </div>
          </a>
        )}
      </div>
      {width && width > 560 && (
        <div
          ref={stickyRef}
          className={`nav flex ${
            sticky ? 'sticky_drug' : ''
          } text-center py-2 m-auto w-full flex gap-2 flex-wrap s: w-100`}
        >
          {header}
        </div>
      )}

      <div className="flex flex-col space-y-5">{content}</div>
    </div>
  );
};

export default GenericDetails;
