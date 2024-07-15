import PageHeroSection from '@components/ui/page-hero-section';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllSiteInfo } from 'src/features/siteInfo/siteInfoSlice';
import _ from 'lodash';

function HeroBanner() {
  const allSiteInfo = useSelector(getAllSiteInfo);
  const [bannerText, setBannerText] = useState('');

  useEffect(() => {
    if (allSiteInfo?.length > 0) {
      const bannerData = _.find(allSiteInfo, (info) => info.content_type == 6);
      if (bannerData) {
        setBannerText(bannerData.content);
      }
    }
  }, [allSiteInfo]);
  return (
    <PageHeroSection
      heroTitle={bannerText}
      backgroundThumbnail="/assets/images/site-image/moto.jpg"
      mobileBackgroundThumbnail="/assets/images/site-image/moto-mobile.jpg"
      variant="white"
    />
  );
}

export default HeroBanner;
