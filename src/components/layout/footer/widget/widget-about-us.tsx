import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Logo from '@components/ui/logo';
import Text from '@components/ui/text';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllSiteInfo } from 'src/features/siteInfo/siteInfoSlice';
import _ from 'lodash';

interface AboutProps {
  className?: string;
  social?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const WidgetAbout: React.FC<AboutProps> = ({ social, className }) => {
  const { t } = useTranslation('footer');
  const allSiteInfo = useSelector(getAllSiteInfo);
  const [titleH1, setTitleH1] = useState('');

  useEffect(() => {
    if (allSiteInfo?.length > 0) {
      const titleH1Data = _.find(allSiteInfo, (info) => info.content_type == 5);
      if (titleH1Data) {
        setTitleH1(titleH1Data.content);
      }
    }
  }, [allSiteInfo]);

  return (
    <div className={`pb-10 sm:pb-0 ${className}`}>
      <div className="flex flex-col text-center sm:ltr:text-left sm:rtl:text-right max-w-[300px] mx-auto sm:ltr:ml-0 sm:rtl:mr-0 pb-6 sm:pb-5">
        <Logo
          href={ROUTES.HOME}
          className="mx-auto mb-3 lg:mb-5 sm:ltr:ml-0 sm:rtl:mr-0"
        />
        <h1 className="text-sm">{titleH1}</h1>
      </div>

      {social && (
        <ul className="flex flex-wrap justify-center mx-auto sm:justify-start">
          {social?.map((item) => (
            <li
              className="transition hover:opacity-80 last:ltr:mr-0 md:ltr:mr-5 md:mx-0 ltr:mr-4 last:rtl:ml-0 rtl:ml-4 md:rtl:ml-5"
              key={`social-list--key${item.id}`}
            >
              <Link href={item.path ? item.path : '/#'}>
                <a target="_blank" rel="noreferrer">
                  <Image
                    src={item.image}
                    alt={item.name}
                    height={item.height}
                    width={item.width}
                    className="transform scale-85 md:scale-100"
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WidgetAbout;
