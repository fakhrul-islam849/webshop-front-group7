import Heading from '@components/ui/heading';
import Link from '@components/ui/link';
import Text from '@components/ui/text';
import { useTranslation } from 'next-i18next';
import { collectionPlaceholder } from '@assets/placeholders';

interface Props {
  imgWidth?: number | string;
  imgHeight?: number | string;
  href: string;
  collection: {
    image: string;
    name: string;
    meta_description?: string;
  };
}

const CollectionCard: React.FC<Props> = ({
  collection,
  imgWidth = 440,
  imgHeight = 280,
  href,
}) => {
  const { image, name, meta_description } = collection;
  const { t } = useTranslation('common');
  return (
    <Link
      href={href}
      className="flex flex-col overflow-hidden rounded-md group shadow-card "
    >
      <img
        src={`${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${image}` ?? collectionPlaceholder}
        alt={t(name) || t('text-card-thumbnail')}
        width={imgWidth}
        height={imgHeight}
        className="object-cover transition duration-300 ease-in-out transform bg-fill-thumbnail group-hover:opacity-90 group-hover:scale-105"
      />
      <div className="flex flex-col px-4 pt-4 pb-4 lg:px-5 xl:px-6 lg:pt-5 md:pb-5 lg:pb-6 xl:pb-7">
        <Heading
          variant="title"
          className="mb-1 lg:mb-1.5 truncate group-hover:text-brand"
        >
          {t(name)}
        </Heading>
        {meta_description &&(
            <Text variant="medium" className="truncate">
              {t(`${meta_description}`)}
            </Text>
        )}
      </div>
    </Link>
  );
};

export default CollectionCard;
