import CollectionCard from '@components/card/collection-card';
import SectionHeader from '@components/common/section-header';
import Container from '@components/ui/container';
import useWindowSize from '@utils/use-window-size';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import { useGetRandomBlogCategoryQuery } from 'src/features/blog/blogApi';
import { paramToString, stringToParam } from '@utils/helperFunction';
import Link from '@components/ui/link';

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

const LivingHealthy: React.FC<Props> = ({
                                        className = 'mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 pb-1 lg:pb-0 3xl:pb-2.5',
                                        headingPosition = 'left',
                                      }) => {
  const { data, isLoading, isSuccess, isError } = useGetRandomBlogCategoryQuery({});
 
  const { width } = useWindowSize();
  return (
      <div className={className}>
        <Container>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <SectionHeader
                  sectionHeading="Living Healthy"
                  sectionSubHeading="text-categories-grocery-items"
                  headingPosition={headingPosition}
              />
            </div>
            <div>
              <Link
                  href='/blog-category'
                  className="float-right"
              >
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 rounded">See All</button>
              </Link>
            </div>
          </div>
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
                {data?.map((item:any) => (
                    <SwiperSlide
                        key={`collection-key-${item.id}`}
                        className="px-1.5 md:px-2 xl:px-2.5 py-4"
                    >
                      <CollectionCard
                          key={item.id}
                          collection={item}
                          href={`/blog-category/${item.id}/${stringToParam(item.name)}`}
                      />
                    </SwiperSlide>
                ))}
              </Carousel>
          ) : (
              <div className="gap-5 2xl:grid 2xl:grid-cols-4 3xl:gap-7">
                {data?.map((item:any) => (
                    <CollectionCard
                        key={item.id}
                        collection={item}
                        href={`/blog-category/${item.id}/${stringToParam(item.name)}`}
                    />
                ))}
              </div>
          )}
        </Container>
      </div>
  );
};

export default LivingHealthy;
