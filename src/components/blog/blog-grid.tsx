import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
import { useGetAllBlogsMutation } from 'src/features/blog/blogApi';
import { useSelector } from 'react-redux';
import { getFilterCategories } from 'src/features/blog/blogSlice';
import ProductCardAlpine from './product-card-alpine';
import Link from '@components/ui/link';
import { paramToString, stringToParam } from '@utils/helperFunction';

interface BlogGridProps {
  className?: string;
}

export const BlogGrid: FC<BlogGridProps> = ({ className = '' }) => {
  const { t } = useTranslation('common');
  const { query } = useRouter();

  const [data, setData] = useState([]);

  const categoryIds = useSelector(getFilterCategories);

  const [getBlog, { isLoading, error, isSuccess }] = useGetAllBlogsMutation();

  useEffect(() => {
    const where = { category_ids: categoryIds };
    getBlog(where)
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
        <Link
          href={`/blog/${product.id}/${stringToParam(product.name)}`}
        >
          <ProductCardAlpine key={`product--key-${product.id}`} product={product} />
        </Link>
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
          'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5',
          className
        )}
      >
        {content}
      </div>
    </>
  );
};
