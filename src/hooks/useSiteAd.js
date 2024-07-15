import React from 'react';
import { useSelector } from 'react-redux';
import { adShowCount, getAllHomePageAd } from '../features/siteAd/siteAdSlice';
import _ from 'lodash';

const useSiteAd = (rowNumber) => {
  const homePageAd = useSelector(getAllHomePageAd);
  const getAdShoWCount = useSelector(adShowCount);

  const data = homePageAd.slice(
    rowNumber * 3 * getAdShoWCount,
    3 * getAdShoWCount * (rowNumber + 1)
  );

  return _.chunk(data, 2);
};

export default useSiteAd;
