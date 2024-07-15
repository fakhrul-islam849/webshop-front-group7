import { ILFlag } from '@components/icons/language/ILFlag';
import { SAFlag } from '@components/icons/language/SAFlag';
import { CNFlag } from '@components/icons/language/CNFlag';
import { USFlag } from '@components/icons/language/USFlag';
import { DEFlag } from '@components/icons/language/DEFlag';
import { ESFlag } from '@components/icons/language/ESFlag';

export const siteSettings = {
  name: 'Drugx test',
  description: 'Drug Index and Medical Portal of Bangladesh',
  author: {
    name: 'DRUGX',
    websiteUrl: 'https://drugx.com.bd',
    address: '',
  },
  logo: {
    url: '/assets/images/site-image/meta-logo.png',
    alt: 'Drugx',
    href: '/',
    width: 128,
    height: 30,
  },
  defaultLanguage: 'en',
  currencyCode: 'USD',
  site_header: {
    menu: [
      {
        id: 1,
        path: '/',
        label: 'Medicine',
        subMenu: [
          {
            id: 3,
            path: '/brand/allopathic',
            label: 'Brand Name (Allopathic)',
          },
          {
            id: 1,
            path: '/generic/allopathic',
            label: 'Generic Name (Allopathic)',
          },
          {
            id: 4,
            path: '/brand/herbal',
            label: 'Brand Name (Herbal)',
          },
          {
            id: 2,
            path: '/generic/herbal',
            label: 'Generic Name (Herbal)',
          },
          {
            id: 5,
            path: '/brand/dermatology',
            label: 'Brand Name (Skin Care)',
          },
          {
            id: 5,
            path: '/brand/food-supplyment',
            label: 'Brand Name (Food Supplyment)',
          },
          {
            id: 5,
            path: '/brand/veterinary',
            label: 'Brand Name (Veterinary)',
          },
          {
            id: 5,
            path: '/dosage-forms',
            label: 'Dosages Form',
          },
        ],
      },

      {
        id: 2,
        path: '/companies',
        label: 'Pharmaceutical',
      },

      {
        id: 3,
        path: '/drug-classes',
        label: 'Drug Class',
      },
      {
        id: 4,
        path: '/blog',
        label: 'Blog',
      },
      {
        id: 5,
        path: '/doctors',
        label: 'Doctors',
      },
      {
        id: 6,
        path: '#',
        label: 'Diagnostic',
        subMenu: [
          {
            id: 1,
            path: '/diagnostic/company',
            label: 'Test Center',
          },
          {
            id: 2,
            path: '/diagnostic/group',
            label: 'Test Group',
          },
        ]
      },
      {
        id: 7,
        path: '/jobs',
        label: 'Jobs',
      },
    ],
    languageMenu: [
      {
        id: 'ar',
        name: 'عربى - AR',
        value: 'ar',
        icon: <SAFlag />,
      },
      {
        id: 'zh',
        name: '中国人 - ZH',
        value: 'zh',
        icon: <CNFlag />,
      },
      {
        id: 'en',
        name: 'English - EN',
        value: 'en',
        icon: <USFlag />,
      },
      {
        id: 'de',
        name: 'Deutsch - DE',
        value: 'de',
        icon: <DEFlag />,
      },
      {
        id: 'he',
        name: 'rעברית - HE',
        value: 'he',
        icon: <ILFlag />,
      },
      {
        id: 'es',
        name: 'Español - ES',
        value: 'es',
        icon: <ESFlag />,
      },
    ],
  },
};
