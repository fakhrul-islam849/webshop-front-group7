import { CategoryFilter } from './category-filter';
import { FilteredItem } from './filtered-item';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAllFilter,
  getAllCategories,
  getFilterCategories,
} from 'src/features/blog/blogSlice';

export const ShopFilters: React.FC = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const { t } = useTranslation('common');
  const selectedCategoryIds = useSelector(getFilterCategories);
  const allCategories = useSelector(getAllCategories);
  const dispatch = useDispatch();

  const handleClearAll = () => {
    dispatch(clearAllFilter());
  };
  return (
    <div className="space-y-10">
      {selectedCategoryIds?.length > 0 && (
        <div className="block -mb-3">
          <div className="flex items-center justify-between mb-4 -mt-1">
            <Heading>{t('text-filters')}</Heading>
            <button
              className="flex-shrink transition duration-150 ease-in text-13px focus:outline-none hover:text-brand-dark"
              aria-label={t('text-clear-all')}
              onClick={() => handleClearAll()}
            >
              {t('text-clear-all')}
            </button>
          </div>
          <div className="flex flex-wrap -m-1">
            {selectedCategoryIds.map((v: any, idx: any) => (
              <FilteredItem
                itemValue={v}
                allCategories={allCategories}
                key={v}
              />
            ))}
          </div>
        </div>
      )}

      <CategoryFilter />
    </div>
  );
};
