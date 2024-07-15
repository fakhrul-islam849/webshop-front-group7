/* eslint-disable @next/next/no-img-element */
import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { ROUTES } from '@utils/routes';
import { searchProductPlaceholder } from '@assets/placeholders';

type SearchProductProps = {
  item: any;
};

const SearchProduct: React.FC<SearchProductProps> = ({ item }) => {
  const { icon, name, type, strength, id } = item || {};

  let href = `/brand/${id}/${name.replace(' ', '-')}`;
  if (type == 'generic') {
    href = `/generic/${id}/${name.replace(' ', '-')}`;
  }

  return (
    <Link
      href={href}
      className="flex items-center justify-start w-full h-auto group"
    >
      {/* <div className="relative flex w-12 h-12 overflow-hidden rounded-md cursor-pointer shrink-0 ltr:mr-4 rtl:ml-4">
        <img
          src={`${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${item.icon}`}
          width={21}
          height={21}
        />
      </div> */}
      <div className="relative flex items-center justify-center w-8 h-8 overflow-hidden rounded-full shrink-0 xl:w-14 xl:h-14 mr-2">
        {type === 'brand' && (

              <img
                  alt="common:text-logo"
                  src={
                    icon
                        ? `${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${icon}`
                        : 'https://dummyimage.com/21x21/ffffff/000000.png'
                  }
                  width={21}
                  height={21}
              />

        )}
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="truncate text-brand-dark text-15px">
          {name}{' '}
          {type === 'brand' && (
            <span
              className="text-brand-muted ml-2 text-sm"
              // style={{ fontSize: '12px', marginLeft: '5px', color: '#898989' }}
            >
              {strength ? strength : ''}
            </span>
          )}
        </h3>
      </div>
    </Link>
  );
};

export default SearchProduct;
