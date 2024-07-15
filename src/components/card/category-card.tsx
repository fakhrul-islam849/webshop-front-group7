import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { LinkProps } from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { getDirection } from '@utils/get-direction';
import cn from 'classnames';
import { categoryPlaceholder } from '@assets/placeholders';

interface Props {
  item: any;
  image?: any;
  path: string | '/';
  className?: string;
}

const CategoryCard: React.FC<Props> = ({ item, image, path, className }) => {
  const { locale } = useRouter();
  const dir = getDirection(locale);
  return (
      <Link
          href={path}
          className={cn('group block w-full text-center', className)}
      >
        <div className="flex max-w-[178px] max-h-[178px] mb-2 mx-auto rounded overflow-hidden bg-fill-thumbnail">
          <div
              className={`flex shrink-0 transition-all duration-700 w-full h-full transform scale-50 group-hover:scale-100 ${
                  dir === 'rtl'
                      ? 'translate-x-full group-hover:translate-x-0'
                      : '-translate-x-full group-hover:translate-x-0'
              }`}
          >
            <Image
                src={image}
                alt={item}
                width={178}
                height={178}
                quality={100}
                className="object-cover rounded"
            />
          </div>
          <div
              className={`flex shrink-0 transition-all duration-700 w-full h-full transform scale-100 group-hover:scale-50 ${
                  dir === 'rtl'
                      ? 'translate-x-full group-hover:translate-x-0'
                      : '-translate-x-full group-hover:translate-x-0'
              }`}
          >
            <Image
                src={image}
                alt={item}
                width={178}
                height={178}
                quality={100}
                className="object-cover rounded"
            />
          </div>
        </div>
        <h3 className="capitalize text-brand-dark font-bold text-sm sm:text-15px lg:text-base truncate">
          {item}
        </h3>
      </Link>
  );
};

export default CategoryCard;
