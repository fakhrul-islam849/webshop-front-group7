import Alert from '@components/ui/alert';
import NoDataFound from '@components/ui/no-data-found';
import React from 'react';
import { useGetDrugSubCategoryByCategoryIdQuery } from 'src/features/dragClass/dragClassApi';
import {stringToParam} from "@utils/helperFunction";
import Link from '@components/ui/link';

type DrugSubCategoryProps = {
  category_id: number;
};

const DrugSubCategory: React.FC<DrugSubCategoryProps> = ({ category_id }) => {
  //   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { data, isLoading, isSuccess, isError } =
    useGetDrugSubCategoryByCategoryIdQuery(category_id);

  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = (
      <div className="w-100 m-auto">
        <Alert message="There was an error occured" />
      </div>
    );

  if (!isLoading && !isError && data?.length > 0) {
    content = data?.map((item: any) => {
      const { id, name } = item || {};

      return (
          <Link
              href={`/drug-classes/${item.id}/${stringToParam(item.name)}`}
              >
              <li
                  key={id}
                  className="text-cyan-700 text-sm font-semibold mr-2 px-2.5 py-1 rounded cursor-pointer hover:bg-cyan-700 hover:text-brand-light"
              >
                {name}
              </li>
          </Link>

      );
    });
  }
  if (!isLoading && !isError && data?.length === 0) {
    content = null;
  }
  return (
    <div>
      <ul>{content}</ul>
    </div>
  );
};

export default DrugSubCategory;
