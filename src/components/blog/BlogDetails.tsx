import Alert from '@components/ui/alert';
import NoDataFound from '@components/ui/no-data-found';
import { useRouter } from 'next/router';
import React from 'react';
import { useGetBlogByIdQuery } from 'src/features/blog/blogApi';
import { formatInTimeZone } from 'date-fns-tz';
import RelatedBlog from '@components/blog/RelatedBlog';

type BlogDetailsProps = {
    data: any;
};
const BlogDetails: React.FC<BlogDetailsProps> = ({ data }) => {

        const content = (
            <>
                <div className="w-full xl:max-w-[1490px] mx-auto">
                    <div className="w-100%">
                        <h1 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-2 lg:mb-3">
                            {(data.blog.name)}
                        </h1>
                        <h3>
                            Category: {(data.category.name)},&nbsp;
                            Last Update: {formatInTimeZone((data.blog.updatedAt), 'Asia/Dhaka', 'dd-MMM-yyyy HH:mm')}
                        </h3>
                        <div
                            className="mt-6 text-sm text-zinc-700 lg:text-15px lg:pl-6"
                            dangerouslySetInnerHTML={{
                                __html: (data.blog.description.replace(/<ul>/g,'')),
                            }}
                        />
                        {data.blog.video_link &&(
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${data.blog.video_link}`}
                                title="Drugx Youtube Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            >
                            </iframe>
                        )}
                    </div>
                    <RelatedBlog className="mb-12 lg:mb-14 xl:mb-6 mt-10 " />
                </div>
            </>
        );

    return <div className="mt-5">{content}</div>;
}

export default BlogDetails;
