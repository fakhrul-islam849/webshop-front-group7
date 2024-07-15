/* eslint-disable @next/next/no-img-element */
import { useTranslation } from 'next-i18next';
import Link from '@components/ui/link';
import Heading from '@components/ui/heading';
import { paramToString, stringToParam } from '@utils/helperFunction';

type DosagesTypeCardProps = {
  item?: any;
};

// {
//     "id": 247,
//     "name": "BstCef",
//     "dosage_type_id": 2,
//     "generic_id": 272,
//     "pharmaceutical_id": 88,
//     "status": 1,
//     "medicine_type": 1,
//     "medicine_for": 1,
//     "current_production": 1,
//     "prescription_status": 1,
//     "unit_price": "12.00",
//     "strength": "500 mg",
//     "package_info": null,
//     "createdAt": "2022-10-20T13:05:06.000Z",
//     "updatedAt": "2022-10-20T13:05:06.000Z"
// }

const DosagesTypeCard: React.FC<DosagesTypeCardProps> = ({ item }) => {
  const placeholderImage = `/assets/placeholder/products/product-grid.svg`;
  const { id, name, total_brand, icon } = item || {};

  return (
    <Link
      href={`/dosage-forms/${id}/${stringToParam(name)}`}
      className="relative flex items-center px-5 py-5 transition-all bg-white border rounded-lg cursor-pointer xl:px-7 xl:py-7 border-border-base shadow-vendorCard hover:bg-sky-100"
    >
      <div className="relative flex items-center justify-center w-16 h-16 overflow-hidden rounded-full shrink-0 bg-fill-thumbnail xl:w-20 xl:h-20">
        <img
          alt="common:text-logo"
          src={
            icon
              ? `${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${icon}`
              : 'https://dummyimage.com/21x21/ffffff/000000.png'
          }
        />
      </div>

      <div className="flex flex-col ltr:ml-4 rtl:mr-4 xl:ltr:ml-5 xl:rtl:mr-5">
        <Heading variant="mediumHeading" className="pb-1.5">
          {paramToString(name)}
        </Heading>
        {/* <Text className="xl:leading-6">{address}</Text> */}
        <div className="mt-2 flex flex-col space-y-0">
          <p className="text-sm text-brand-muted mb-0 leading-6">
            {total_brand ? total_brand : 0} Brand
          </p>
        </div>
      </div>
    </Link>
  );
};

export default DosagesTypeCard;
