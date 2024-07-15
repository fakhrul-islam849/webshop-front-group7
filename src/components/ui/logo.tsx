/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from '@components/ui/link';
import cn from 'classnames';
import { siteSettings } from '@settings/site-settings';
import { useSelector } from 'react-redux';
import { getAllSiteInfo } from 'src/features/siteInfo/siteInfoSlice';
import { useEffect, useState } from 'react';
import _ from 'lodash';

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  href = siteSettings.logo.href,
  ...props
}) => {
  // logo: {
  //   url: '/assets/images/logo.svg',
  //   alt: 'BoroBazar',
  //   href: '/',
  //   width: 128,
  //   height: 30,
  // },

  const allSiteInfo = useSelector(getAllSiteInfo);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (allSiteInfo?.length > 0) {
      const bannerData = _.find(allSiteInfo, (info) => info.content_type == 7);
      if (bannerData) {
        setUrl(bannerData.content);
      }
    }
  }, [allSiteInfo]);

  return (
    <Link
      href={href}
      className={cn('inline-flex', className)}
      {...props}
    >
      {url !== '' && (
        <img
          src={
            url
              ? `${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${url}`
              : 'https://dummyimage.com/21x21/ffffff/000000.png'
          }
          alt="Logo"
          height={30}
          width={128}
          // layout="fixed"
          loading="eager"
        />
      )}
    </Link>
  );
};

export default Logo;
