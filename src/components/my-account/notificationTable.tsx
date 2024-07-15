import { Table } from '@components/ui/table';
import Input from '@components/ui/form/input';
import { useState } from 'react';
import Pagination from '@components/ui/pagination';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { GrNext, GrPrevious } from 'react-icons/gr';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUnseenNotificationIds } from 'src/features/notifications/notificationSlice';
import { removeUnseenId } from '../../features/notifications/notificationSlice';
import { useDeleteNotificationMutation } from 'src/features/notifications/notificationApi';
const NotificationTable: React.FC<{
  orders?: any;
  listView: any;
  setListView: any;
  setNotificationDetails: any;
}> = ({ orders, listView, setListView, setNotificationDetails }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState('');
  const countPerPage = 5;
  let [filterData, setDataValue] = useState(orders.slice(0, countPerPage));

  const unseenIds = useSelector(getAllUnseenNotificationIds);

  const [deleteNotification] = useDeleteNotificationMutation();

  const updatePage = (p: any) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setDataValue(orders.slice(from, to));
  };

  const onChangeSearch = (e: any) => {
    setValue(e.target.value);

    setCurrentPage(1);
    let filter: any = orders
      .filter((item: any) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
      .slice(0, countPerPage);
    if (!e.target.value) {
      updatePage(1);
    }
    setDataValue(filter);
  };

  const handleNotificationClick = (item: any, seenStatus: boolean) => {
    setListView(false);
    setNotificationDetails(item);
    if (!seenStatus) {
      dispatch(removeUnseenId(item.id));
      deleteNotification({
        notification_id: item.id,
      });
    }
  };

  const renderNotificationList = (item: any, index: any) => {
    if (unseenIds.includes(item.id)) {
      return (
        <li
          key={index}
          className="px-6 py-2 border-b border-gray-200 w-full  cursor-pointer bg-brand-tree text-white"
          onClick={() => handleNotificationClick(item, false)}
        >
          {item.name}
        </li>
      );
    }

    return (
      <li
        key={index}
        className="px-6 py-2 border-b border-gray-200 w-full  cursor-pointer"
        onClick={() => handleNotificationClick(item, true)}
      >
        {item.name}
      </li>
    );
  };

  return (
    <>
      <div className="items-center mb-5 md:flex md:justify-between sm:mb-10">
        <h2 className="mb-4 text-sm font-semibold md:text-xl text-brand-dark md:mb-0">
          Notifications
        </h2>
        <Input
          name="search"
          type="text"
          value={value}
          onChange={onChangeSearch}
          placeholder="Search Order list"
          variant="solid"
          className="w-full sm:w-1/2 px-1.5 md:px-2.5"
        />
        {/* </form> */}
      </div>
      <ul className="bg-white border-gray-200 w-[100%] text-gray-900">
        {filterData?.length > 0 ? (
          filterData.map((item: any, index: any) =>
            renderNotificationList(item, index)
          )
        ) : (
          <span className="flex items-center justify-center">
            No Data Found
          </span>
        )}
      </ul>
      {filterData?.length <= 0 ||
        (!value.trim() && (
          <div className="mt-5 ltr:text-right rtl:text-left">
            <Pagination
              current={currentPage}
              onChange={updatePage}
              pageSize={countPerPage}
              total={orders?.length}
              prevIcon={<GrPrevious size={12} style={{ color: '#090B17' }} />}
              nextIcon={<GrNext size={12} style={{ color: '#090B17' }} />}
              className="order-table-pagination"
            />
          </div>
        ))}
    </>
  );
};

export default NotificationTable;
