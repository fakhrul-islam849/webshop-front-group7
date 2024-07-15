import React from 'react';
import { paramToString, stringToParam } from '@utils/helperFunction';

const CompanyInfo = ({ info }) => {
  const {
    established,
    market_share,
    growth,
    total_generics,
    headquarter,
    location,
    contact_details,
    id,
    name,
    fax,
  } = info;
  return (
    <ul className="max-auto divide-y divide-gray-200 dark:divide-gray-700">
      <li className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              Established
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {established ? established : 'Not found'}
          </div>
        </div>
      </li>
      <li className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              Market Share
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {market_share ? `${market_share} %` : 'Not found'}
          </div>
        </div>
      </li>
      <li className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              Growth
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {growth ? growth : 'Not FOund'}
          </div>
        </div>
      </li>
      <li className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              Total generics
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {total_generics ? total_generics : 0}
          </div>
        </div>
      </li>
      <li className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              Headquarter
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {headquarter ? headquarter : 'Not Found'}
          </div>
        </div>
      </li>
      <li className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              Contact details
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {contact_details ? contact_details : 'Not Found'}
          </div>
        </div>
      </li>
      <li className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              Fax
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {fax ? fax : 'Not Found'}
          </div>
        </div>
      </li>
      <li className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              Available Brand
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            <a
              href={`/companies/${id}/${stringToParam(name)}/brand`}
              className="mt-3 text-sm font-semibold px-5 py-2  w-fit text-brand-tree cursor-pointer ring-2 ring-brand-tree rounded-sm hover:bg-brand-tree hover:text-brand-light"
            >
              See All Brand
            </a>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default CompanyInfo;
