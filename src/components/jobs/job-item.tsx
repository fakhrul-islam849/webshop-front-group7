/* eslint-disable @next/next/no-img-element */
import { formatTime } from '@utils/helperFunction';
import React from 'react';
import { paramToString, stringToParam } from '@utils/helperFunction';
import Link from '@components/ui/link';

interface ProductProps {
  job: any;
}
const JobItem: React.FC<ProductProps> = ({ job }) => {
  const { id, name, published, deadline, meta_keyword, pharmaceutical } = job || {};

  const { name: pharmaceuticalName, logo } = pharmaceutical;
  return (
      <Link
          href={`/jobs/${id}/${stringToParam(name)}`}
      >
        <li className="pb-3 sm:pb-4 p-2 hover:bg-slate-300 cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                  className="w-8 h-8 rounded-full"
                  // src="https://dummyimage.com/50x50/cfcdcf/000000.png"
                  src={
                    logo
                        ? `${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${logo}`
                        : 'https://dummyimage.com/50x50/cfcdcf/000000.png'
                  }
                  alt="Neil image"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {name}
              </h2>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                Published : {formatTime(published, 'MMM d, yyy')} | {deadline}
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {pharmaceuticalName}
            </div>
          </div>
        </li>
      </Link>

  );
};

export default JobItem;
