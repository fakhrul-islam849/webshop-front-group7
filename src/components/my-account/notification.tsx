import Layout from '@components/layout/layout';
import { useState } from 'react';
import { useGetAllNotificationsQuery } from '../../features/notifications/notificationApi';
import NotificationDetailsView from './NotificationDetailsView';
import NotificationTable from './notificationTable';

export default function Notification() {
  const { data: notificationData, isLoading } = useGetAllNotificationsQuery({});
  const [listView, setListView] = useState(true);
  const [notificationDetails, setNotificationDetails] = useState(null);

  let content = null;

  if (isLoading) {
    content = (
      <div className="flex flex-col flex-1 gap-3">
        <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
        <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
        <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
        <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
        <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
        <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
        <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
        <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
      </div>
    );
  }

  if (!isLoading && listView) {
    content = (
      <NotificationTable
        orders={notificationData}
        listView={listView}
        setListView={setListView}
        // notificationDetails={notificationDetails}
        setNotificationDetails={setNotificationDetails}
      />
    );
  }
  if (!isLoading && !listView) {
    content = (
      <div className="flex flex-col flex-1 gap-3">
        <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
        <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
        <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
        <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
        <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
        <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
        <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
        <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
      </div>
    );
  }
  if (!isLoading && !listView && notificationData !== null) {
    content = (
      <NotificationDetailsView
        listView={listView}
        setListView={setListView}
        notificationData={notificationDetails}
        setNotificationDetails={setNotificationDetails}
      />
    );
  }

  return (
    <div>
      <div className="flex flex-col pt-4 2xl:pt-4">{content}</div>
    </div>
  );
}

Notification.Layout = Layout;
