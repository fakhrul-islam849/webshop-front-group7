import BannerCard from '@components/card/banner-card';
import React from 'react';
import Link from '@components/ui/link';

type DrugDetailsProps = {
  item?: any;
  index: any;
  allAdData: any;
};

const DrugDetails: React.FC<DrugDetailsProps> = ({
  item,
  index,
  allAdData,
}) => {
  const { title, description } = item || {};

  const uniqueId = `${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="flex flex-col space-y-3 text-sm">
      <div className="bg-cyan-700 py-2 text-slate-100 text-[20px] font-bold capitalize pl-2 rounded-sm">
        {title}
      </div>
      {index == 0 && allAdData?.length > 1 && (
        <div className="text-center py-2 m-auto w-full flex gap-2 flex-wrap s: w-100">
          <BannerCard
            // key={`bundle-key-${index}`}
            // banner={item[Math.floor(Math.random() * item.length)]}
            className="w-[49%]"
            banner={allAdData[1]}
            effectActive={true}
          />
            {allAdData?.length > 2 && (
                <BannerCard
                    // key={`bundle-key-${index}`}
                    // banner={item[Math.floor(Math.random() * item.length)]}
                    className="w-[49%]"
                    banner={allAdData[2]}
                    effectActive={true}
                />
            )}
        </div>
      )}
      <p
        className="text-[16px]"
        dangerouslySetInnerHTML={{ __html: description.replace(/<ul>/g,'') }}
        id={uniqueId}
      >
      </p>
    {title == 'Dosage & Administration' && (
        <Link
            href={`/blog/11/কেন-ডাক্তারের-পরামর্শ-ছাড়া-ওষুধ-খাবেন-না?`}
            className="text-emerald-700"
        >* চিকিৎসকের পরামর্শ মোতাবেক ঔষধ সেবন করুন
        </Link>
    )}
    </div>
  );
};

export default DrugDetails;
