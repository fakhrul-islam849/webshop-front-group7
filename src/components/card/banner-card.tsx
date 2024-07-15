/* eslint-disable @next/next/no-img-element */
import Link from '@components/ui/link';
import Image from 'next/image';
import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';
import { useAdVisitorAndClickMutation } from 'src/features/siteInfo/siteInfoApi';

interface BannerProps {
  banner: any;
  variant?: 'rounded' | 'default';
  effectActive?: boolean;
  className?: string;
  classNameInner?: string;
}

function getImage(deviceWidth: number, imgObj: any) {
  if (deviceWidth < 680) {
    return {
      url: imgObj.image_mobile,
      width: 300,
      height: 50,
    };
  }

  return {
    url: imgObj.image_desktop,
    width: 597,
    height: 340,
  };
}

const BannerCard: React.FC<BannerProps> = ({
  banner,
  className,
  variant = 'default',
  effectActive = true,
  classNameInner,
}) => {
  const { width } = useWindowSize();
  const { redirect, title, image, name } = banner;
  const [adVisitorAndCount] = useAdVisitorAndClickMutation();

  const selectedImage = getImage(width!, banner);

  const adOnClick = () => {
    adVisitorAndCount({
      type: 2,
      ad_id: banner.id,
    });
  };

  return (
    <div className={`mt-2 ${className}`}>
      <Link
        href={redirect ? redirect : '/'}
        passHref
        className={cn(
          'h-full group flex justify-center relative overflow-hidden',
          classNameInner
        )}
      >
        <a target="_blank"></a>

        <img
          src={
            selectedImage.url
              ? `${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${selectedImage.url}`
              : '/assets/images/blog.jpg'
          }
          width={selectedImage.width}
          height={selectedImage.height}
          alt={`${name}`}
          className={cn('bg-fill-thumbnail object-cover w-full', {
            'rounded-md': variant === 'rounded',
          })}
          onClick={() => adOnClick}
        />
        {effectActive && (
          <div className="absolute top-0 block w-1/2 h-full transform -skew-x-12 ltr:-left-full rtl:-right-full z-5 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine" />
        )}
      </Link>
    </div>
  );
};

export default BannerCard;
