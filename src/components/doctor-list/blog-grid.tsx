import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
import { useGetAllDoctorsMutation } from 'src/features/doctor/doctorApi';
import { useSelector } from 'react-redux';
import { getFilter } from 'src/features/doctor/doctorSlice';
import ProductCardAlpine from './product-card-alpine';

interface BlogGridProps {
  className?: string;
}

export const BlogGrid: FC<BlogGridProps> = ({ className = '' }) => {
  const { t } = useTranslation('common');
  const { query } = useRouter();

  const [data, setData] = useState([]);

  const categoryIds = useSelector(getFilter);

  const [getDoctors, { isLoading, error, isSuccess }] =
    useGetAllDoctorsMutation();

  useEffect(() => {
    const where = { department_ids: categoryIds };
    getDoctors(where)
      .unwrap()
      .then((originalPromiseResult) => {
        setData(originalPromiseResult);
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
      });
  }, [categoryIds]);

  let content = null;

  if (isLoading) {
    content = Array.from({ length: 30 }).map((_, idx) => (
      <ProductCardLoader
        key={`product--key-${idx}`}
        uniqueKey={`product--key-${idx}`}
      />
    ));
  }

  if (isSuccess && data?.length > 0) {
    content = data.map((product: any, idx) => (
      <ProductCardAlpine key={`product--key-${product.id}`} product={product} />
    ));
  }
  if (isSuccess && data?.length <= 0) {
    content = (
      <div className="col-span-full">
        <Alert message="No Data Found" />
      </div>
    );
  }

  if (error) {
    content = (
      <div className="col-span-full">
        <Alert message="Sorry Something Wrong" />
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 md:gap-3 2xl:gap-5',
          className
        )}
      >
        {content}
      </div>
    </>
  );
};
