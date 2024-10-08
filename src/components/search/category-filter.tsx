import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import CategoryFilterMenu from '@components/search/category-filter-menu';
import Alert from '@components/ui/alert';
import Scrollbar from '@components/ui/scrollbar';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useGetAllBlogCategoryQuery } from '../../features/blog/blogApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllCategories } from 'src/features/blog/blogSlice';

export const CategoryFilter = () => {
  const { t } = useTranslation('common');
  const {
    data,
    isLoading: loading,
    error,
    isSuccess,
  } = useGetAllBlogCategoryQuery({
    limit: 10,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data?.length > 0) {
      dispatch(setAllCategories(data));
    }
  }, [isSuccess]);

  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-72 mt-8 px-2">
          <CategoryListCardLoader uniqueKey="category-list-card-loader" />
        </div>
      </div>
    );
  }
  if (error) return <Alert message={error.message} />;

  return (
    <div className="block">
      <Heading className="mb-5 -mt-1">{t('text-categories')}</Heading>
      <div className="max-h-full overflow-hidden rounded border border-border-base">
        <Scrollbar className="w-full category-filter-scrollbar">
          {data?.length ? (
            <CategoryFilterMenu items={data} />
          ) : (
            <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
              {t('text-no-results-found')}
            </div>
          )}
        </Scrollbar>
      </div>
    </div>
  );
};
