/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { CheckBox } from '@components/ui/form/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFilter,
  removeFilterById,
  setFilter,
} from 'src/features/doctor/doctorSlice';

function DepartmentFilterMenuItem({
  className = 'hover:bg-fill-base border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3',
  item,
  depth = 0,
}: any) {
  const { t } = useTranslation('common');
  const selectedCategoryIds = useSelector(getFilter);
  const dispatch = useDispatch();
  const { name, id } = item;

  const handleOnClick = () => {
    if (selectedCategoryIds.includes(id)) {
      dispatch(removeFilterById(id));
    } else {
      dispatch(setFilter(id));
    }
  };

  return (
    <>
      <li
        onClick={() => handleOnClick()}
        className={cn(
          'flex justify-between items-center transition text-sm md:text-15px',
          { 'bg-fill-base': selectedCategoryIds.includes(id) },
            className
        )}
      >
        <button
          className={cn(
            'flex items-center w-full ltr:text-left rtl:text-right cursor-pointer group',
            { 'py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3': depth > 0 }
          )}
          // onClick={handleChange}
        >
          <h2 className="text-brand-dark capitalize py-0.5">
            {name}
          </h2>

          <span className="ltr:ml-auto rtl:mr-auto">
            {' '}
            <CheckBox
              name={item.name.toLowerCase()}
              checked={selectedCategoryIds.includes(id)}
            />
          </span>
        </button>
      </li>
    </>
  );
}

function DepartmentFilterMenu({ items, className }: any) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: any) => (
        <DepartmentFilterMenuItem
          key={`${item.name}-key-${item.id}`}
          item={item}
        />
      ))}
    </ul>
  );
}

export default DepartmentFilterMenu;
