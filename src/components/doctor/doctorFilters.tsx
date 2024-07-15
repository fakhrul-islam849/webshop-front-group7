import { DepartmentFilter } from './department-filter';
import { DoctorFilteredItem } from './doctor-filtered-item';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAllFilter,
  getFilter,
  getAllDepartments,
} from 'src/features/doctor/doctorSlice';

export const DoctorFilter: React.FC = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const { t } = useTranslation('common');
  const selectedCategoryIds = useSelector(getFilter);
  const allCategories = useSelector(getAllDepartments);
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
              <DoctorFilteredItem
                itemValue={v}
                allCategories={allCategories}
                key={v}
              />
            ))}
          </div>
        </div>
      )}

      <DepartmentFilter />
    </div>
  );
};
