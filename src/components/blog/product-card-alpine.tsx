/* eslint-disable @next/next/no-img-element */
import cn from 'classnames';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import { useTranslation } from 'next-i18next';
import Text from '@components/ui/text';

interface ProductProps {
  product: any;
  className?: string;
}

const ProductCardAlpine: React.FC<ProductProps> = ({ product, className }) => {
  const { name, image, unit, meta_description, image: icon } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');

  return (
    <article
      className={cn(
        'flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full',
        className
      )}
      title={name}
    >
      <div className="relative shrink-0">
        <div className="flex overflow-hidden max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <img
            alt="common:text-logo"
            width={230}
            height={200}
            src={
              icon
                ? `${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${icon}`
                : '/assets/images/blog.jpg'
            }
          />
        </div>
      </div>

      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-3 lg:pt-1.5 h-full">
        <div className="mb-1 lg:mb-1.5 -mx-1">
          <h2 className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
            {name}
          </h2>
        </div>
        <Text variant="medium" className="truncate">
          {t(`${meta_description}`)}
        </Text>

      </div>
    </article>
  );
};

export default ProductCardAlpine;
