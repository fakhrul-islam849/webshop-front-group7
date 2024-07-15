import GenericDetails from '@components/GenericDetails/GenericDetails';
import Alert from '@components/ui/alert';
import Heading from '@components/ui/heading';
import NoDataFound from '@components/ui/no-data-found';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  useGetBrandByIdQuery,
} from 'src/features/brand/brandApi';
import BrandInfo from './BrandInfo';

type BrandDetailsProps = {
  data: any;
};

const BrandDetails: React.FC<BrandDetailsProps> = ({ data }) => {
    const content = (
      <div className="w-full xl:max-w-[1490px] mx-auto">
        <BrandInfo info={data} />

        <div className="w-100%">
          <div className="flex flex-wrap bg-brand-light w-full">
            <GenericDetails genericId={data.brand.generic_id} pdfLocation={data.brand.generic.innovators_monograph} pdfButton="hidden" />
          </div>
        </div>
      </div>
    );

  return <div className="mt-5">{content}</div>;
}

export default BrandDetails;
