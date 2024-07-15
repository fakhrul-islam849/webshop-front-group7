import Alert from '@components/ui/alert';
import NoDataFound from '@components/ui/no-data-found';
import React, { useEffect, useState } from 'react';
import { useGetDrugCategoryByDrugIdQuery } from 'src/features/dragClass/dragClassApi';
import Link from '@components/ui/link';
import {stringToParam} from "@utils/helperFunction";

type DrugCategoryProps = {
  drug_class_id: number;
  selectedCategoryId: number | null;
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setHaveCategory: React.Dispatch<React.SetStateAction<boolean>>;
  setHaveSubCategory: React.Dispatch<React.SetStateAction<boolean>>;
};

const DrugCategory: React.FC<DrugCategoryProps> = ({
  drug_class_id,
  setSelectedCategoryId,
  selectedCategoryId,
  setHaveCategory,
  setHaveSubCategory,
}) => {
  //   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { data, isLoading, isSuccess, isError } =
    useGetDrugCategoryByDrugIdQuery(drug_class_id);

  useEffect(() => {
    if (isSuccess && data) {
      if (data?.length > 0) {
        setSelectedCategoryId(data[0].id);
        if (data[0].generic_ids && data[0].generic_ids != 'null' && data[0].generic_ids.length > 0) {
          setHaveSubCategory(false);
        } else {
          setHaveSubCategory(true);
        }
      }
    }
  }, [isSuccess, data]);

  const handleOnClickCategory = (item: any) => {
    setSelectedCategoryId(item.id);
    if (item.generic_ids &&  item.generic_ids != 'null' && item.generic_ids.length > 0) {
      setHaveSubCategory(false);
    } else {
      setHaveSubCategory(true);
    }
  };

  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = (
      <div className="w-100 m-auto">
        <Alert message="There was an error occured" />
      </div>
    );

  if (!isLoading && !isError && data?.length > 0) {
    setHaveCategory(true);

    content = data?.map((item: any) => {
      const { id, name } = item || {};
      let url = `#`;
      if(item.generic_ids &&  item.generic_ids != 'null' && item.generic_ids.length > 0){
        url = `drug-classes/category/${item.id}/${stringToParam(item.name)}`;
      }
      if (id == selectedCategoryId) {
        return (
            <Link
                href={url}
            >
              <li
                key={id}
                className="text-md font-semibold mr-2 px-2.5 py-1 rounded cursor-pointer bg-brand text-brand-light"
              >
                {name}
              </li>
            </Link>
        );
      }

      return (
          <Link
              href={url}
          >
            <li
              key={id}
              onClick={() => handleOnClickCategory(item)}
              className="text-cyan-700 text-sm font-semibold mr-2 px-2.5 py-1 rounded cursor-pointer hover:bg-cyan-700 hover:text-brand-light"
            >
              {name}
            </li>
          </Link>
      );
    });
  }
  if (!isLoading && !isError && data?.length === 0) {
    setHaveCategory(false);
    content = (
      <div className="w-100 m-auto">
        <NoDataFound message="No Category Found" />
      </div>
    );
  }
  return (
    <div>
      <ul>{content}</ul>
    </div>
  );
};

export default DrugCategory;
