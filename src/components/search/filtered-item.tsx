import { useRouter } from 'next/router';
import { IoClose } from 'react-icons/io5';
import isEmpty from 'lodash/isEmpty';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { removeFilterById } from 'src/features/blog/blogSlice';
interface Props {
  itemValue: string;
  allCategories: any[];
}

export const FilteredItem = ({ itemValue, allCategories }: Props) => {
  const data = _.find(allCategories, (cat) => cat.id == itemValue);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(removeFilterById(itemValue));
  };
  return (
    <div
      className="group flex shrink-0 m-1 items-center border border-border-base rounded-lg text-13px px-2.5 py-1.5 capitalize text-brand-dark cursor-pointer transition duration-200 ease-in-out hover:border-brand"
      onClick={handleClose}
    >
      {data && data?.name ? data.name : 'Not Found'}
      <IoClose className="text-sm text-body ltr:ml-2 rtl:mr-2 shrink-0 ltr:-mr-0.5 rtl:-ml-0.5 mt-0.5 transition duration-200 ease-in-out group-hover:text-heading" />
    </div>
  );
};
