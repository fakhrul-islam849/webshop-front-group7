import Heading from '@components/ui/heading';
import Link from 'next/link';
import React from 'react';
type SingleBrandProps = {
  item?: any;
};
const SingleBrand: React.FC<SingleBrandProps> = ({ item }) => {
  const {
    name,
    unit_price,
    strength,
    generic,
    pharmaceutical,
    dosage_type,
    id,
  } = item || {};
  const { name: genericName } = generic || {};
  const { name: pharmaceuticalName } = pharmaceutical || {};
  const { icon } = dosage_type || {};
  return (
    <Link href={`/brand/${id}/${name.replace(' ', '-')}`}>
      <div className="w-full md:w-[48%] xl:w-[48%] md:ltr:pr-8 md:rtl:pl-8 lg:ltr:pr-0 lg:rtl:pl-0 2xl:rtl:pl-24 lg:mb-0 mb-8 text-left bg-white border rounded-lg cursor-pointer border-border-base shadow-vendorCard hover:shadow-vendorCardHover p-2">
        <div className="flex flex-row gap-4">
          <img
            src={
              icon
                ? `${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${icon}`
                : 'https://dummyimage.com/21x21/ffffff/000000.png'
            }
            alt={genericName}
            style={{height:25, width:25}}
          />
          <Heading variant="mediumHeading" className="pb-1.5">
            {name}
          </Heading>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="text-xs">{strength ? strength : ''}</div>
          <div className="text-xs">
            {pharmaceuticalName ? pharmaceuticalName : ''}
          </div>
          <div className="text-xs">Unit Price: {unit_price}</div>
        </div>
      </div>
    </Link>
  );
};

export default SingleBrand;
