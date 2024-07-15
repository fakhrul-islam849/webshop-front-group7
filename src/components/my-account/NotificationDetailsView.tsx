import { Table } from '@components/ui/table';
import Input from '@components/ui/form/input';
import { useState } from 'react';
import Pagination from '@components/ui/pagination';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { GrNext, GrPrevious } from 'react-icons/gr';
import _ from 'lodash';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotificationDetailsView: React.FC<{
  listView: any;
  setListView: any;
  notificationData: any;
  setNotificationDetails: any;
}> = ({ listView, setListView, notificationData, setNotificationDetails }) => {

  const { message } = notificationData || {};

  const handleback = () => {
    setNotificationDetails(null);
    setListView(true);
  };

  return (
    <>
      <div className="items-center mb-5 md:flex md:justify-between sm:mb-10">
        <h2 className="mb-4 text-sm font-semibold md:text-xl text-brand-dark md:mb-0">
          <ArrowBackIcon
            className="cursor-pointer"
            onClick={() => handleback()}
          />
          <span className="ml-3">{notificationData?.name}</span>
        </h2>
      </div>
      {/* <ul className="bg-white rounded-lg border border-gray-200 w-[100%] text-gray-900"> */}
      <div className="pl-2" dangerouslySetInnerHTML={{ __html: message }}></div>
      {/* </ul> */}
    </>
  );
};

export default NotificationDetailsView;
