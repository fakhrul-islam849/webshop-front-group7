/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { CheckBox } from '@components/ui/form/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFilterCategories,
  removeFilterById,
  setFilter,
} from 'src/features/blog/blogSlice';

function CategoryFilterMenuItem({
  className = 'hover:bg-fill-base border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3',
  item,
  depth = 0,
}: any) {
  const { t } = useTranslation('common');
  const selectedCategoryIds = useSelector(getFilterCategories);
  const dispatch = useDispatch();
  const { name, image: icon, id } = item;

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
          <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto ltr:mr-2.5 rtl:ml-2.5 md:ltr:mr-4 md:rtl:ml-4 2xl:ltr:mr-3 2xl:rtl:ml-3 3xl:ltr:mr-4 3xl:rtl:ml-4">
            <img
              alt="common:text-logo"
              src={
                icon
                  ? `${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${icon}`
                  : 'https://dummyimage.com/21x21/ffffff/000000.png'
              }
              height={50}
              width={50}
            />
          </div>

          <h3 className="text-brand-dark capitalize py-0.5">{name}</h3>

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

function CategoryFilterMenu({ items, className }: any) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: any) => (
        <CategoryFilterMenuItem
          key={`${item.name}-key-${item.id}`}
          item={item}
        />
      ))}
    </ul>
  );
}

export default CategoryFilterMenu;
