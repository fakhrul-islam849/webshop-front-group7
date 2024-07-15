import Alert from '@components/ui/alert';
import NoDataFound from '@components/ui/no-data-found';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useGetBrandsByGenericIdQuery } from 'src/features/brand/brandApi';
import cn from 'classnames';

import _ from 'lodash';
import SingleTableRow from './SingleTableRow';
import SingleSelect from '@components/MuiSelect/SingleSelect';
import BrandCard from '@components/card/brand-card';
import {stringToParam} from "@utils/helperFunction";
import {any} from "prop-types";

function AllBrand() {
  const {
    query: { genericId },
  } = useRouter();

  const [sorting, setSorting] = useState(0);
  const [companyId, setCompanyId] = useState('');
  const [dosagesType, setDosagesType] = useState('');
  const [strength, setStrength] = useState('');
  const [ showGoTop, setShowGoTop ] = useState( false);

  // start handle top
  const handleVisibleButton = () => {
    setShowGoTop( window.pageYOffset > 50 )
  };

  const handleScrollUp = () => {
    window.scrollTo( { left: 0, top: 0, behavior: 'smooth' } )
  };
  useEffect( () => {
    window.addEventListener( 'scroll', handleVisibleButton )
  }, [] );

  // end handle top

  const removeDuplicate = (arr: any) => {
    const ids = arr.map((o: any) => o.id);

    const removeDuplicate = arr.filter(
        ({ id }: any, index: any) => !ids.includes(id, index + 1)
    );
     const sort = removeDuplicate.slice().sort((a: any,b: any) => {
       return a.name.localeCompare(b.name);
    });
    return sort;
  };

  const { data, isLoading, isSuccess, isError } =
    useGetBrandsByGenericIdQuery(genericId);

  let content = null;
  let mobileContent = null;
  let otherCombination = null;
  let renderCompany = null;
  let renderDosages = null;
  let renderStrength = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = (
      <div className="w-100 m-auto">
        <Alert message="There was an error occurred" />
      </div>
    );

  if (!isLoading && !isError && data?.brand?.length > 0) {
    // Company Group
    const allCompany: any = [];
    const allDosages: any = [];
    const allStrength: any = [];
    const brands = data?.brand;
    brands.map((item: any) => {
      allCompany.push({
        id: item?.pharmaceutical?.id,
        name: item?.pharmaceutical?.name,
      });
      allDosages.push({
        id: item?.dosage_type?.id,
        name: item?.dosage_type?.name,
      });
      allStrength.push({
        id: item?.strength,
        name: item?.strength,
      });
    });

    // setCompanies(allCompany);
    // setDosages(allDosages);
    // setStrength(allStrength);

    renderCompany = (
      <SingleSelect
        options={removeDuplicate(allCompany)}
        setValue={setCompanyId}
        value={companyId}
        placeholder="Select Company"
      />
    );
    renderDosages = (
      <SingleSelect
        options={removeDuplicate(allDosages)}
        setValue={setDosagesType}
        value={dosagesType}
        placeholder="Select Dosage"
      />
    );
    renderStrength = (
      <SingleSelect
        options={removeDuplicate(allStrength)}
        setValue={setStrength}
        value={strength}
        placeholder="Select Strength"
      />
    );



    otherCombination = (
        <div>
          {!isLoading && data.combination.length > 0 && (
              <div className="flex flex-wrap gap-2 pb-4">
                <div className="text-sm">Other Generic Combinations:</div>
                {data.combination.map((item:any) => (
                    // eslint-disable-next-line react/jsx-key
                      <Link
                          href={`/generic/${item.id}/${stringToParam(item.name)}`}
                      >
                        <button className="text-sm font-semibold px-2 py-1 w-fit text-brand-tree cursor-pointer ring-2 ring-brand-tree rounded-sm hover:bg-brand-tree hover:text-brand-light">
                          {item.name}
                        </button>

                      </Link>
                ))}
              </div>
          )}
        </div>
    );
  }

  if (!isLoading && !isError && data?.brand?.length === 0) {
    content = (
      <div className="w-100 m-auto">
        <NoDataFound />
      </div>
    );
  }

  const filterByCompany = (data: any) => {
    if (companyId != '') {
      return data.pharmaceutical_id == companyId;
    }
    return true;
  };
  const filterByDosagesType = (data: any) => {
    if (dosagesType != '') {
      return data.dosage_type_id == dosagesType;
    }
    return true;
  };
  const filterByStrangth = (data: any) => {
    if (strength != '') {
      return data.strength == strength;
    }
    return true;
  };

  mobileContent = (
      <div className="grid grid-cols-1">
        {data?.brand?.length > 0 &&
            data?.brand.slice().sort((a: any, b: any) => {
              if(sorting == 0) {
                return 0;
              }
              if(sorting == 1) {
                return a.name.localeCompare(b.name);
              }
              if(sorting == 2) {
                return a.unit_price - b.unit_price;
              }
              if(sorting == 3) {
                return b.total_visitor - a.total_visitor;
              }
              return 0;
            })
                .filter(filterByCompany)
                .filter(filterByDosagesType)
                .filter(filterByStrangth)
                .map((item: any) => {
                  return <BrandCard className="odd:bg-white even:bg-teal-400" key={item.id} brand={item}/>
                })}
      </div>
  );

  return (
      <div>
        {otherCombination}
        <div className="flex flex-col space-y-3">
          <div className="w-full">
            <div className="sm:grid sm:grid-cols-12 sm:pt-2 lg:flex lg:gap-2 lg:block lg:pt-0 lg:pb-2 flow-root">
              <div className="flex">
                <div>{renderCompany}</div>
                <div className="hidden lg:block">{renderDosages}</div>
                <div>{renderStrength}</div>
              </div>
              <div className="flex pt-2 lg:pt-0">
                  <div className="pr-2 lg:pl-60"><p className="float-right">Sort by:</p></div>
                  <div><button onClick={() => setSorting(1)}
                               className={cn('float-right text-sm font-semibold px-5 py-2  w-fit cursor-pointer ring-2 ring-brand-tree rounded-sm',
                                   {'bg-brand-tree text-brand-light': sorting === 1})}>Name
                  </button></div>
                  <div><button onClick={() => setSorting(2)}
                               className={cn('float-right text-sm font-semibold px-5 py-2  w-fit cursor-pointer ring-2 ring-brand-tree rounded-sm',
                                   {'text-brand-light bg-brand-tree': sorting === 2})}>Price
                  </button></div>
                  <div><button onClick={() => setSorting(3)}
                               className={cn('text-sm font-semibold px-5 py-2  w-fit cursor-pointer ring-2 ring-brand-tree rounded-sm',
                                   {'float-right bg-brand-tree text-brand-light': sorting === 3})}>Popularity
                  </button></div>
                </div>
            </div>
            <div className="pt-2 block lg:hidden">
              {mobileContent}
            </div>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg hidden lg:block">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-md font-bold uppercase bg-cyan-700 text-white">
                <tr>
                  <th scope="col" className="py-3 px-4">
                    Brand Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center">Dosages Form</div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center">Strength</div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center">Company</div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center">Price</div>
                  </th>
                </tr>
                </thead>
                <tbody>
                {!isLoading &&
                    !isError &&
                    data?.brand?.length > 0 &&
                    data?.brand.slice().sort((a: any, b: any) => {
                      if(sorting == 0) {
                        return 0;
                      }
                      if(sorting == 1) {
                        return a.name.localeCompare(b.name);
                      }
                      if(sorting == 2) {
                        return a.unit_price - b.unit_price;
                      }
                      if(sorting == 3) {
                        return b.total_visitor - a.total_visitor;
                      }
                      return 0;
                    })
                        .filter(filterByCompany)
                        .filter(filterByDosagesType)
                        .filter(filterByStrangth)
                        .map((item: any) => {
                          return <SingleTableRow key={item.id} item={item} />;
                        })}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <img onClick={ handleScrollUp } className="float-right" height="60" width="60" src={'/assets/images/back-top.png'} />
            </div>
          </div>
        </div>
      </div>
  );
}

export default AllBrand;
