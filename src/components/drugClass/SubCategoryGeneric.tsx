import Alert from '@components/ui/alert';
import Heading from '@components/ui/heading';
import NoDataFound from '@components/ui/no-data-found';
import { useGetGenericByCategoryIdQuery } from 'src/features/dragClass/dragClassApi';
import {paramToString, stringToParam} from '@utils/helperFunction';
import Link from '@components/ui/link';
import { useRouter } from 'next/router';
import Text from '@components/ui/text';

function SubCategoryGeneric() {

    const {
        query: { id },
    } = useRouter();

    const { data, isLoading, isSuccess, isError } = useGetGenericByCategoryIdQuery(id);

    let content = null;
    if (isLoading) content = <p>Loading...</p>;

    if (!isLoading && isError)
        content = (
            <div className="w-100 m-auto">
                <Alert message="There was an error occured" />
            </div>
        );

    if (!isLoading && !isError && data.category) {
        content = (
            <>
                <div className="w-100%">
                    <h2 className="font-bold text-xl">Generic List for Drug Class- {data.category.name}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 xl:gap-6 mt-4 mb-4">
                        {data.combination?.map((item:any) => (
                            <Link
                                href={`/generic/${item.id}/${stringToParam(item.name)}`}
                                className="relative flex items-center px-2 py-2 transition-all bg-white border rounded-lg cursor-pointer xl:px-5 xl:py-5 border-border-base shadow-vendorCard hover:bg-sky-100"
                            >
                                <div className="flex flex-col ltr:ml-4 rtl:mr-4 xl:ltr:ml-5 xl:rtl:mr-5">
                                    <Heading variant="mediumHeading" className="pb-1">
                                        {item.name}
                                    </Heading>
                                    {/* <Text className="xl:leading-6">{address}</Text> */}
                                    <div className=" flex flex-col space-y-0">
                                        <p className="text-sm text-brand-muted mb-0 leading-6">
                                            {item.total_brand ? item.total_brand : 0} Brand
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </>
        );
    }

    if (!isLoading && !isError && data == undefined && data.category) {
        content = (
            <div className="w-100 m-auto">
                <NoDataFound />
            </div>
        );
    }

    return <div className="mt-5">{content}</div>;
}

export default SubCategoryGeneric;
