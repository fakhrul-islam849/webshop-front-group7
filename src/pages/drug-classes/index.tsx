/* eslint-disable react/no-unknown-property */
import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useGetAllDrugClassQuery } from '../../features/dragClass/dragClassApi';
import Heading from '@components/ui/heading';
import { useEffect, useState } from 'react';
import NoDataFound from '@components/ui/no-data-found';
import Alert from '@components/ui/alert';
import DosagesTypeCard from '@components/card/dosages-type-card';
import DrugCategory from '@components/drugClass/drug-category';
import DrugSubCategory from '@components/drugClass/drug-sub-category';
import PageSeo from "@components/seo/page-seo";
export default function DrugClasses() {
    const [selectedId, setSelectedId] = useState(null);
    const [selectedDrugName, setSelectedDrugName] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null
    );
    const [haveCategory, setHaveCategory] = useState<boolean>(false);
    const [haveSubCategory, setHaveSubCategory] = useState<boolean>(false);
    const { data, isLoading, isSuccess, isError } = useGetAllDrugClassQuery({});

    useEffect(() => {
        if (isSuccess && data) {
            if (data?.length > 0) {
                setSelectedId(data[0].id);
                setSelectedDrugName(data[0].name);
            }
        }
    }, [isSuccess, data]);

    const handleDrugOnClick = (item: any) => {
        setSelectedId(item.id);
        setSelectedDrugName(item.name);
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
        content = data?.map((item: any) => {
            const { id, name } = item || {};

            if (id == selectedId) {
                return (
                    <h2
                        key={id}
                        className="bg-brand hover:bg-brand text-brand-light text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded cursor-pointer"
                    >
                    {name}
                  </h2>
                );
            }

            return (
                <h2
                    key={id}
                    onClick={() => handleDrugOnClick(item)}
                    className="bg-cyan-700 hover:bg-brand text-brand-light text-xl font-semibold mr-2 px-2.5 py-0.5 rounded cursor-pointer"
                >
                  {name}
                </h2>
            );
        });
    }

    if (!isLoading && !isError && data?.length === 0) {
        content = (
            <div className="w-100 m-auto">
                <NoDataFound />
            </div>
        );
    }

    return (
        <>
            {/*<PageSeo*/}
            {/*    title="All Dosage Class List"*/}
            {/*    path="/dosage-class"*/}
            {/*/>*/}
            <Container className="mx-auto">
                <div className="w-full xl:max-w-[1490px] mx-auto">
                    <Heading variant="pageHeading" className="m-4 lg:mb-6">
                        Drug Classes
                    </Heading>

                    <div className="text-center py-2 m-auto w-full flex gap-2 flex-wrap s: w-100">
                        {content}
                    </div>
                    <Heading variant="titleLarge" className="mt-4 lg:mt-4 ml-2">
                        {selectedDrugName}
                        <hr className="border-4 border-blue-500 cursor-pointer hover:border-red-500 duration-500"/>
                    </Heading>
                    <div className="items-center mt-2 mx-auto gap-4 md:flex xl:gap-12">
                        <div className="flex-1 space-y-4 pb-2">
                            {selectedId && (
                                <DrugCategory
                                    drug_class_id={selectedId}
                                    setSelectedCategoryId={setSelectedCategoryId}
                                    selectedCategoryId={selectedCategoryId}
                                    setHaveCategory={setHaveCategory}
                                    setHaveSubCategory={setHaveSubCategory}
                                />
                            )}
                        </div>
                        <div className="flex-1 space-y-4">
                            <hr className="sm:block lg:hidden border-4 border-red-500 cursor-pointer hover:border-blue-500 duration-500"/>
                            {selectedCategoryId && haveCategory && haveSubCategory && (
                                <DrugSubCategory category_id={selectedCategoryId} />
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

DrugClasses.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const queryClient = new QueryClient();
    const  openGraphData= {
        'title': 'All Dosage Class List',
        'path' : '/dosage-class',
    };
    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            ...(await serverSideTranslations(locale!, [
                'common',
                'forms',
                'menu',
                'footer',
            ])),
            openGraphData,
        },
        revalidate: 60,
    };
};
