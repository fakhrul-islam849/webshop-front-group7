/* eslint-disable react/no-unknown-property */
import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import Pagination from '@components/ui/pagination';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { useGetBrandListDermatologyQuery } from '../../features/brand/brandApi';
import Heading from '@components/ui/heading';
import { useEffect, useState } from 'react';
import BrandCard from '@components/card/brand-card';
import { CheckBox } from '@components/ui/form/checkbox';
import NoDataFound from '@components/ui/no-data-found';
import { alphabet } from '../../utils/constant';
import Alert from '@components/ui/alert';
import PageSeo from "@components/seo/page-seo";

export default function Dermatology() {
    const [pageNumber, setPageNumber] = useState<any>(0);
    const [total, setTotal] = useState<any>(0);
    const [selectedAlphabet, setSelectedAlphabet] = useState<any>('');
    const [showAlphabetically, setShowAlphabetically] = useState<any>(true);
    const { data, isLoading, isSuccess, isError } = useGetBrandListDermatologyQuery({
        page: pageNumber,
        search_key: selectedAlphabet,
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
    if (isLoading) content = <p>Loading...</p>;

    if (!isLoading && isError)
        content = (
            <div className="w-100 m-auto">
                <Alert message="There was an error occured" />
            </div>
        );

    if (!isLoading && !isError && data?.data?.length > 0) {
        content = data?.data.map((item: any) => (
            <BrandCard key={item.id} brand={item} />
        ));
    }

    if (!isLoading && !isError && data?.data?.length === 0) {
        content = (
            <div className="w-100 m-auto">
                <NoDataFound />
            </div>
        );
    }

    const handleAlphabetClick = (alpha: string) => {
        setPageNumber(0);
        setSelectedAlphabet(alpha);
    };

    const handleAlphabeticAction = (e: any) => {
        const { value } = e.currentTarget;
        setPageNumber(0);
        if (value == 'false') {
            setSelectedAlphabet('A');
        } else {
            setSelectedAlphabet('');
        }
        setShowAlphabetically((prev: boolean) => !prev);
    };

    const renderAlphabeticArea = () => {
        if (showAlphabetically) {
            return (
                <div className="text-center py-2 m-auto w-full flex gap-2 flex-wrap s: w-100">
                    {alphabet.map((item) => {
                        return item == selectedAlphabet ? (
                            <span
                                key={item}
                                onClick={(e) => handleAlphabetClick(item)}
                                className="flex items-center justify-center w-8 h-8 text-sm rounded-full bg-brand lg:w-10 lg:h-10 text-brand-light focus:outline-none"
                            >
                {item}
              </span>
                        ) : (
                            <span
                                key={item}
                                onClick={(e) => handleAlphabetClick(item)}
                                className="flex items-center justify-center w-8 h-8 text-sm rounded-full hover:bg-brand lg:w-10 lg:h-10 text-brand-dark border-brand-tree border-2  focus:outline-none"
                            >
                {item}
              </span>
                        );
                    })}
                </div>
            );
            return null;
        }
    };

    return (
        <>
            <PageSeo
                title="All Brand List Skin Care"
                path="/brand/dermatology"
            />
            <Container className="mx-auto">
                <div className="w-full xl:max-w-[1490px] mx-auto">
                    <Heading variant="titleLarge" className="mb-4 lg:mb-6">
                        Brand List Skin Care
                    </Heading>
                    {/* {!isLoading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 xl:gap-6 mt-4 mb-4">
                {data?.data.map((item, index) => (
                  <BrandCard key={item.id} brand={item} />
                ))}
              </div>
            )} */}
                    <div className="w-100%">
                        <div className="flex flex-col justify-between">
                            <div className="w-80 m-auto">
                                <CheckBox
                                    label="Browse Alphabetically"
                                    name="name"
                                    checked={showAlphabetically}
                                    value={showAlphabetically}
                                    onChange={(e) => handleAlphabeticAction(e)}
                                    justify="justify-start"
                                />{' '}
                            </div>
                            {renderAlphabeticArea()}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 xl:gap-6 mt-4 mb-4">
                        {content}
                    </div>
                    <Pagination
                        current={pageNumber + 1}
                        onChange={(e) => handlePageChange(e)}
                        pageSize={30}
                        total={total}
                        prevIcon={
                            <GrPrevious
                                onClick={() => handlePrevButton()}
                                size={12}
                                style={{ color: '#090B17' }}
                            />
                        }
                        nextIcon={
                            <GrNext
                                onClick={() => handleNextButton()}
                                size={12}
                                style={{ color: '#090B17' }}
                            />
                        }
                        className="order-table-pagination mt-5"
                    />
                </div>
            </Container>
        </>
    );
}

Dermatology.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const queryClient = new QueryClient();

    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            ...(await serverSideTranslations(locale!, [
                'common',
                'forms',
                'menu',
                'footer',
            ])),
        },
        revalidate: 60,
    };
};
