import BannerCard from '@components/card/banner-card';
import useWindowSize from '@utils/use-window-size';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import useSiteAd from '../../hooks/useSiteAd';
import useInterval from '../../hooks/useInterval';
interface BannerProps {
  // data: any;
  grid?: number;
  className?: string;
  rowCount: number;
}

const breakpoints = {
  '560': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  '0': {
    slidesPerView: 1,
  },
};

const BannerGrid: React.FC<BannerProps> = ({
  grid = 3,
  className = 'mb-2',
  rowCount,
}) => {
  const { width } = useWindowSize();
  let data = useSiteAd(rowCount);

  return (
    <div className={className}>
      {width! < 680 ? (
        <>
          {data?.map((item, index) => {
            return (
              <BannerCard
                key={`bundle-key-${index}`}
                banner={item[Math.floor(Math.random() * item.length)]}
                effectActive={true}
              />
            );
          })}
        </>
      ) : (
        <div
          className={`grid gap-4 2xl:gap-5 grid-cols-1 sm:grid-cols-${grid}`}
        >
          {/* {data?.map((banner: any) => (
            <BannerCard
              key={`banner--key${banner.id}`}
              banner={banner}
              effectActive={true}
            />
          ))} */}

          {data?.map((item, index) => {
            return (
              <BannerCard
                key={`bundle-key-${index}`}
                banner={item[Math.floor(Math.random() * item.length)]}
                effectActive={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BannerGrid;
