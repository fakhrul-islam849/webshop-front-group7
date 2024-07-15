import { Table } from '@components/ui/table';
import Input from '@components/ui/form/input';
import { useState } from 'react';
import Pagination from '@components/ui/pagination';
import DeleteIcon from '@mui/icons-material/Delete';
// import { TotalPrice } from '@components/order/price';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { BsSearch } from 'react-icons/bs';
import { useCartItemRemoveMutation } from 'src/features/cart/cartApi';
import _ from 'lodash';

const CartTable: React.FC<{ orders?: any }> = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState('');
  const countPerPage = 5;
  let [filterData, setDataValue] = useState(orders.slice(0, countPerPage));

  const [cartDelete] = useCartItemRemoveMutation();

  const handleCartDelete = (id: any) => {
    cartDelete({ brand_id: id });
    const removedData = _.filter(filterData, (data) => data.id != id);
    setDataValue(removedData);
  };

  const CreatedAt: React.FC<{ createdAt?: any }> = ({ createdAt }) => {
    dayjs.extend(relativeTime);
    dayjs.extend(utc);
    dayjs.extend(timezone);
    return (
      <span className="whitespace-nowrap">
        {dayjs.utc(createdAt).tz(dayjs.tz.guess()).fromNow()}
      </span>
    );
  };

  const renderGenericName = (items: any) => {
    return items;
  };

  const renderTotalPrice = (items: any) => {
    return Number(items.unit_price) * Number(items.quantity);
  };

  const columns = [
    //   {
    //     title: '#SL',
    //     dataIndex: 'id',
    //     key: 'id',
    //     className: 'id-cell',
    //     width: 140,
    //   },
    {
      title: 'Brand Name',
      dataIndex: 'name',
      key: 'name',
      width: 140,
      render: function genericName(items: any) {
        return renderGenericName(items);
      },
    },
    {
      title: 'Price',
      dataIndex: 'unit_price',
      key: 'unit_price',
      width: 140,
    },
    {
      title: 'Quantity',
      key: 'quantity',
      width: 130,
      render: function renderQuantity(items: any) {
        return Number(items.quantity);
      },
    },
    {
      title: 'Total Price',
      key: 'price',
      width: 130,
      render: function totalPrice(items: any) {
        return renderTotalPrice(items);
      },
    },
    {
      dataIndex: '',
      key: 'operations',
      width: 80,
      render: function actionsButton(item: any) {
        return <DeleteIcon onClick={() => handleCartDelete(item.id)} />;
      },
      className: 'operations-cell',
    },
  ];

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
  const onSubmitHandle = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="items-center mb-5 md:flex md:justify-between sm:mb-10">
        <h2 className="mb-4 text-sm font-semibold md:text-xl text-brand-dark md:mb-0">
          My Cart list
        </h2>
        {/* <form onSubmit={onSubmitHandle} className="relative"> */}

        {/* <Input
          name="search"
          type="text"
          value={value}
          onChange={onChangeSearch}
          placeholder="Search Order list"
          color="red"
          //   inputClassName=" h-[46px] w-full bg-white border border-[#E3E8EC] rounded-md order-search focus:border-2 focus:outline-none focus:border-brand focus:text-brand-muted"
        /> */}

        <Input
          name="search"
          type="text"
          value={value}
          onChange={onChangeSearch}
          placeholder="Search By Brand Name"
          variant="solid"
          className="w-full sm:w-1/2 px-1.5 md:px-2.5"
        />
        {/* </form> */}
      </div>
      <div className="order-list-table-wraper">
        {filterData?.length > 0 ? (
          <Table
            className="order-list-table"
            columns={columns}
            data={filterData}
            rowKey="id"
            scroll={{ x: 750 }}
          />
        ) : (
          <span className="flex items-center justify-center">
            No Data Found
          </span>
        )}
      </div>
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

export default CartTable;
