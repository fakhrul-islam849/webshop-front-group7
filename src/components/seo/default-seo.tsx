import { DefaultSeo as NextDefaultSeo } from 'next-seo';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllSiteInfo } from 'src/features/siteInfo/siteInfoSlice';
import _ from 'lodash';

export const DefaultSeo = () => {

    const allSiteInfo = useSelector(getAllSiteInfo);
    const [title, setTitle] = useState('Largest Online Medicine Index of Bangladesh');
    const [metaTitle, setMetaTitle] = useState('');
    const [description, setDescription] = useState('Explore drugx for an extensive database of medications, Indications, dosage instructions, Interaction, side effects, veterinary, update price & diagnostic test cost');
    const [keyword, setKeyword] = useState('medicine, drug, medicine information, medicine website bangladesh');

    useEffect(() => {
        if (allSiteInfo?.length > 0) {
            const contentTitle = _.find(allSiteInfo, (info) => info.content_type == 1);
            if (contentTitle) {
                setTitle(contentTitle.content);
            }
            const contentMetaTitle = _.find(allSiteInfo, (info) => info.content_type == 2);
            if (contentMetaTitle) {
                setMetaTitle(contentMetaTitle.content);
            }
            const contentDescription = _.find(allSiteInfo, (info) => info.content_type == 3);
            if (contentDescription) {
                setDescription(contentDescription.content);
            }
            const contentKeyword = _.find(allSiteInfo, (info) => info.content_type == 4);
            if (contentKeyword) {
                setKeyword(contentKeyword.content);
            }
        }
    }, [allSiteInfo]);
  return (
    <NextDefaultSeo
      title={title}
      titleTemplate={`Drugx | %s`}
      description={description}
      canonical="https://www.drugx.com.bd/"
      openGraph={{
          type: 'website',
          locale: 'en_us',
          url:'/',
          title: title,
          description: description,
          article: {
              authors: [
                  'fakhrulislam739@gmail.com',
              ],
              tags: [keyword],
          },
          images: [
              {
                  url: 'https://www.drugx.com.bd/assets/images/site-image/meta-logo.png',
                  alt: title,
                  width:200,
                  height:200
              },
          ],
      }}
      facebook={{
          appId:'44'
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
      additionalMetaTags={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1 maximum-scale=1',
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ]}
      additionalLinkTags={[
        {
          rel: 'apple-touch-icon',
          href: 'icons/apple-icon-180.png',
        },
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
      ]}
    />
  );
};
