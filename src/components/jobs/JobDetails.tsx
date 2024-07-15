import Alert from '@components/ui/alert';
import Heading from '@components/ui/heading';
import NoDataFound from '@components/ui/no-data-found';
import Seo from '@components/seo/seo';;
import { formatInTimeZone } from 'date-fns-tz';
import React from "react";

type JobDetailsProps = {
    data: any;
};
const JobDetails: React.FC<JobDetailsProps> = ({ data }) => {

        const content = (
            <>
                {/*<Seo*/}
                {/*    title={`${data.job.name} : ${data.pharmaceutical.name} | Job Details`}*/}
                {/*    description={data.job.meta_description}*/}
                {/*    path={`/jobs/${jobId}/${stringToParam(data.job.name)}`}*/}
                {/*    keyword={data.job.meta_keyword}*/}
                {/*    image={`/assets/images/site-image/meta-logo.png`}*/}
                {/*/>*/}
                <div className="w-full xl:max-w-[1490px] mx-auto">
                    <div className="w-100%">
                        <h1 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-2 lg:mb-3">
                            {(data.job.name)}
                        </h1>
                        <h3>
                            {(data.pharmaceutical.name)} &nbsp; | &nbsp;
                            Last Update: {formatInTimeZone((data.job.updatedAt), 'Asia/Dhaka', 'dd-MMM-yyyy HH:mm')}
                        </h3>
                        <h4 className="mb-4">
                            Published: {formatInTimeZone((data.job.published), 'Asia/Dhaka', 'dd-MMM-yyyy HH:mm')} &nbsp; | &nbsp;
                            Deadline: {(data.job.deadline)}
                        </h4>
                        <div className="bg-zinc-300 py-2 font-bold text-brand-dark text-md capitalize pl-2 rounded-sm">
                            Apply Procedure
                        </div>
                        <div
                            className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose"
                            dangerouslySetInnerHTML={{
                                __html: (data.job.apply_procedure)
                            }}
                        />
                        <div className="bg-zinc-300 py-2 font-bold text-brand-dark text-md capitalize pl-2 rounded-sm">
                            Job Description
                        </div>
                        <div
                            className="mt-6 text-sm text-zinc-700 lg:text-15px lg:pl-6"
                            dangerouslySetInnerHTML={{
                                __html: (data.job.description.replace(/<ul>/g,'')),
                            }}
                        />
                    </div>
                </div>
            </>
        );

    return <div className="mt-5">{content}</div>;
}

export default JobDetails;
