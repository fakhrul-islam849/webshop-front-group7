/* eslint-disable @next/next/no-img-element */
import Link from '@components/ui/link';
import Heading from '@components/ui/heading';
import { paramToString, stringToParam } from '@utils/helperFunction';

type GenericCardProps = {
  item?: any;
};

const GenericCard: React.FC<GenericCardProps> = ({ item }) => {
  const { name, total_brand, id } = item || {};
  return (
    <Link
      href={`/generic/${id}/${stringToParam(name)}`}
      className="relative flex items-center px-2 py-2 transition-all bg-white border rounded-lg cursor-pointer xl:px-5 xl:py-5 border-border-base shadow-vendorCard hover:bg-sky-100"
    >
      <div className="flex flex-col ltr:ml-4 rtl:mr-4 xl:ltr:ml-5 xl:rtl:mr-5">
        <Heading variant="mediumHeading" className="pb-1">
          {name}
        </Heading>
        {/* <Text className="xl:leading-6">{address}</Text> */}
        <div className=" flex flex-col space-y-0">
          <p className="text-sm text-brand-muted mb-0 leading-6">
            {total_brand ? total_brand : 0} Brand
          </p>
        </div>
      </div>
    </Link>
  );
};

export default GenericCard;
