/* eslint-disable @next/next/no-img-element */
import Link from '@components/ui/link';
import Heading from '@components/ui/heading';
import { paramToString, stringToParam } from '@utils/helperFunction';

type PharmaceuticalCardProps = {
  item?: any;
};

const PharmaceuticalCard: React.FC<PharmaceuticalCardProps> = ({ item }) => {
  const {
    name,
    total_brand,
    total_generics,
    id,
    headquarter,
    market_share,
    description,
  } = item || {};
  let href = `/companies/${id}/${name.replace(' ', '-')}`;

  if (headquarter == null || market_share == null || description == null) {
    href = `/companies/${id}/${stringToParam(name)}/brand`;
  }
  return (
    <Link
      href={href}
      className="relative flex items-center px-2 py-2 transition-all bg-white border rounded-lg cursor-pointer xl:px-5 xl:py-5 border-border-base shadow-vendorCard hover:bg-sky-100"
    >
      <div className="flex flex-col ltr:ml-4 rtl:mr-4 xl:ltr:ml-5 xl:rtl:mr-5">
        <Heading variant="titleMedium" className="pb-1">
          {name ? paramToString(name) : 'Unknown'}
        </Heading>
        {/* <Text className="xl:leading-6">{address}</Text> */}
        <div className=" flex flex-col space-y-0">
          <p className="text-sm text-brand-muted mb-0 leading-6">
            {total_generics ? total_generics : 0} generics,{' '}
            {total_brand ? total_brand : 0} Brand
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PharmaceuticalCard;
