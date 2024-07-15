import { NextSeo, NextSeoProps } from 'next-seo';
interface SeoProps extends NextSeoProps {
    title:string;
    path: string;
}

const PageSeo = ({ title, path }: SeoProps) => {
    const description = 'Explore drugx for an extensive database of medications, Indications, dosage instructions, Interaction, side effects, veterinary, update price & diagnostic test cost';
    const keyword = 'The largest online directory of medications. To find out more about any drugs pharmacology, use, side effects, price, dosage, and administration, just go Drugx.';

    return (
        <NextSeo
            title={title}
            titleTemplate={`%s | Drugx`}
            description={description}
            canonical={`https://www.drugx.com.bd${path}`}
            openGraph={{
                type: 'website',
                locale: 'en_us',
                url: `https://www.drugx.com.bd${path}`,
                title: `${title} | Drugx`,
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

export default PageSeo;
