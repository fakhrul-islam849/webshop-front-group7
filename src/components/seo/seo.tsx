import { NextSeo, NextSeoProps } from 'next-seo';

interface SeoProps extends NextSeoProps {
  title:string;
  path: string;
  keyword: string;
  image: string;
  description:string;
}

const Seo = ({ title, description, path, keyword, image }: SeoProps) => {
  return (
    <NextSeo
        title={title}
        titleTemplate={`${title} | Drugx`}
          description={description}
          canonical={`https://www.drugx.com.bd${path}`}
          openGraph={{
            type: 'website',
            locale: 'en_us',
            url: `https://www.drugx.com.bd${path}`,
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
                url: image,
                alt: title,
              },
            ],
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

export default Seo;
