/* eslint-disable @next/next/no-img-element */
import Alert from '@components/ui/alert';
import Pagination from '@components/ui/pagination';
import React, { useEffect, useState } from 'react';
import { useGetAllJobsQuery } from '../../features/job/jobApi';
import JobItem from './job-item';
import { GrNext, GrPrevious } from 'react-icons/gr';

function JobList() {
  const [pageNumber, setPageNumber] = useState<any>(0);
  const [total, setTotal] = useState<any>(0);
  const [searchKey, setSearchKey] = useState<any>('');

  const { data, isLoading, isSuccess, error } = useGetAllJobsQuery({
    page: pageNumber,
    search_key: searchKey,
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { currentPage, totalItems } = data || {
        currentPage: 1,
        totalItems: 30,
      };

      setTotal(totalItems);
    }
  }, [isSuccess, data]);

  const handlePageChange = (e: number) => {
    setPageNumber(e - 1);
  };
  const handlePrevButton = () => {
    setPageNumber((prev: number) => prev - 1);
  };
  const handleNextButton = () => {
    setPageNumber((prev: number) => prev + 1);
  };

  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isSuccess && data.data?.length > 0) {
    content = data?.data.map((job: any, idx: any) => (
      <JobItem key={`product--key-${job.id}`} job={job} />
    ));
  }
  if (isSuccess && data?.data?.length <= 0) {
    content = (
      <div className="col-span-full">
        <Alert message="No Data Found" />
      </div>
    );
  }

  if (error) {
    content = (
      <div className="col-span-full">
        <Alert message="Sorry Something Wrong" />
      </div>
    );
  }

  return (
    <ul className="w-auto divide-y divide-gray-200 dark:divide-gray-700 mt-2">
      {content}

      <div className="mt-10 ltr:text-right rtl:text-left">
        <Pagination
          current={pageNumber + 1}
          onChange={(e) => handlePageChange(e)}
          pageSize={10}
          total={total}
          prevIcon={
            <GrPrevious
              size={12}
              style={{ color: '#090B17' }}
              onClick={() => handlePrevButton()}
            />
          }
          nextIcon={
            <GrNext
              size={12}
              style={{ color: '#090B17' }}
              onClick={() => handleNextButton()}
            />
          }
          className="order-table-pagination"
        />
      </div>
    </ul>
  );
}

export default JobList;
