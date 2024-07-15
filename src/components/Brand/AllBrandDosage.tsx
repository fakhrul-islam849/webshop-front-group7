import Alert from '@components/ui/alert';
import NoDataFound from '@components/ui/no-data-found';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useGetBrandsByDosageIdQuery } from 'src/features/brand/brandApi';

import _ from 'lodash';
import SingleTableRow from './SingleTableRow';
import SingleSelect from '@components/MuiSelect/SingleSelect';

function AllBrand() {
    const {
        query: { dosageId },
    } = useRouter();

    const [companyId, setCompanyId] = useState('');
    const [genericId, setGenericId] = useState('');

    const removeDuplicate = (arr: any) => {
        const ids = arr.map((o: any) => o.id);
        return arr.filter(
            ({ id }: any, index: any) => !ids.includes(id, index + 1)
        );
    };

    const { data, isLoading, isSuccess, isError } =
        useGetBrandsByDosageIdQuery(dosageId);

    let content = null;
    let renderCompany = null;
    let renderGeneric = null;
    if (isLoading) content = <p>Loading...</p>;

    if (!isLoading && isError)
        content = (
            <div className="w-100 m-auto">
                <Alert message="There was an error occurred" />
            </div>
        );

    if (!isLoading && !isError && data?.length > 0) {
        // Company Group
        const allCompany: any = [];
        const allGeneric: any = [];
        const brands = data;
        brands.map((item: any) => {
            allCompany.push({
                id: item?.pharmaceutical?.id,
                name: item?.pharmaceutical?.name,
            });
            allGeneric.push({
                id: item?.generic?.id,
                name: item?.generic?.name,
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
        renderGeneric = (
            <SingleSelect
                options={removeDuplicate(allGeneric)}
                setValue={setGenericId}
                value={genericId}
                placeholder="Select Generic"
            />
        );
    }

    if (!isLoading && !isError && data?.length === 0) {
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
    const filterByGeneric = (data: any) => {
        if (genericId != '') {
            return data.generic_id == genericId;
        }
        return true;
    };

    return (
        <div className="flex flex-col space-y-3">
            <div className="w-full">
                <div className="lg:flex gap-2 hidden md:block">
                    <div>{renderCompany}</div>
                    <div>{renderGeneric}</div>
                </div>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Brand Name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Generic Name
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
                            data?.length > 0 &&
                            data.filter(filterByCompany)
                                .filter(filterByGeneric)
                                .map((item: any) => {
                                    return <SingleTableRow key={item.id} item={item} />;
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AllBrand;
