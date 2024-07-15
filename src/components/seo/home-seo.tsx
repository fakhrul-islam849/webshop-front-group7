import { NextSeo, NextSeoProps } from 'next-seo';
interface SeoProps extends NextSeoProps {
    title:string;
    description: string;
    keyword: string;
}

const HomeSeo = ({ title, description, keyword }: SeoProps) => {
    return (
        <NextSeo
            title={title}
            titleTemplate={`Drugx | %s`}
            description={description}
            canonical={`https://www.drugx.com.bd/`}
            openGraph={{
                type: 'website',
                locale: 'en_us',
                url: `https://www.drugx.com.bd`,
                title: `Drugx | ${title} `,
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

export default HomeSeo;
