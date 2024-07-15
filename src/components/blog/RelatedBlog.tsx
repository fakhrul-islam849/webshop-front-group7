import CollectionCard from '@components/card/collection-card';
import SectionHeader from '@components/common/section-header';
import Container from '@components/ui/container';
import useWindowSize from '@utils/use-window-size';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import { useGetRandomBlogQuery } from 'src/features/blog/blogApi';
import { stringToParam } from '@utils/helperFunction';

interface Props {
  className?: string;
  headingPosition?: 'left' | 'center';
}

const breakpoints = {
  '1024': {
    slidesPerView: 3,
  },
  '768': {
    slidesPerView: 3,
  },
  '540': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

const RelatedBlog: React.FC<Props> = ({
  className = 'mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 pb-1 lg:pb-0 3xl:pb-2.5',
  headingPosition = 'left',
}) => {
  const { data, isLoading, isSuccess, isError } = useGetRandomBlogQuery({});
  const { width } = useWindowSize();
  return (
    <div className={className}>
      <Container>
        <SectionHeader
          sectionHeading="Related Blog"
          sectionSubHeading="text-categories-grocery-items"
          headingPosition={headingPosition}
        />
        {width! < 1536 ? (
          <Carousel
            breakpoints={breakpoints}
            autoplay={{ delay: 4000 }}
            prevButtonClassName="ltr:-left-2.5 rtl:-right-2.5 -top-14"
            nextButtonClassName="ltr:-right-2.5 rtl:-left-2.5 -top-14"
            className="-mx-1.5 md:-mx-2 xl:-mx-2.5 -my-4"
            prevActivateId="collection-carousel-button-prev"
            nextActivateId="collection-carousel-button-next"
          >
            {data?.map((item: any) => (
              <SwiperSlide
                key={`collection-key-${item.id}`}
                className="px-1.5 md:px-2 xl:px-2.5 py-4"
              >
                <CollectionCard
                  key={item.id}
                  collection={item}
                  href={`/blog/${item.id}/${stringToParam(item.name)}`}
                />
              </SwiperSlide>
            ))}
          </Carousel>
        ) : (
          <div className="gap-5 2xl:grid 2xl:grid-cols-4 3xl:gap-7">
            {data?.map((item: any) => (
              <CollectionCard
                key={item.id}
                collection={item}
                href={`/blog/${item.id}/${stringToParam(item.name)}`}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default RelatedBlog;
