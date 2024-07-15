import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import DepartmentFilterMenu from '@components/doctor/department-filter-menu';
import Alert from '@components/ui/alert';
import Scrollbar from '@components/ui/scrollbar';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useGetAllDoctorDepartmentQuery } from '../../features/doctor/doctorApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllDepartments } from 'src/features/doctor/doctorSlice';

export const DepartmentFilter = () => {
  const { t } = useTranslation('common');
  const {
    data,
    isLoading: loading,
    error,
    isSuccess,
  } = useGetAllDoctorDepartmentQuery({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data?.length > 0) {
      dispatch(setAllDepartments(data));
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
  if (error) return <Alert message="Sorry Something Wrong" />;

  return (
    <div className="block">
      <Heading className="mb-5 -mt-1">Departments</Heading>
      <div className="max-h-full overflow-hidden rounded border border-border-base">
        <Scrollbar className="w-full category-filter-scrollbar">
          {data?.length ? (
            <DepartmentFilterMenu items={data} />
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
