import dynamic from 'next/dynamic';
import CategoryCard from '@components/card/category-card';
import { getDashboardData } from 'src/features/siteInfo/siteInfoSlice';
import { useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';
import useWindowSize from '@utils/use-window-size';
const Carousel = dynamic(() => import('@components/ui/carousel/carousel'), {
  ssr: false,
});

interface CategoriesProps {
  className?: string;
}
const breakpoints = {
  '1640': {
    slidesPerView: 9,
    spaceBetween: 24,
  },
  '1280': {
    slidesPerView: 7,
    spaceBetween: 20,
  },
  '1024': {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  '768': {
    slidesPerView: 5,
    spaceBetween: 15,
  },
  '530': {
    slidesPerView: 4,
    spaceBetween: 15,
  },
  '0': {
    slidesPerView: 3,
    spaceBetween: 15,
  },
};
const items = [
  {
    name: '',
    key: 'total_brand',
    image:'/assets/images/site-image/category/1.jpg',
    path:'/brand/allopathic',
  },
  {
    name: '',
    key: 'total_generic_allopathic',
    image:'/assets/images/site-image/category/2.jpg',
    path:'/generic/allopathic',
  },
  {
    name: '',
    key: 'total_generic_herbal',
    image:'/assets/images/site-image/category/3.jpg',
    path:'/generic/herbal',
  },
  {
    name: '',
    key: 'total_pharmaceutical',
    image:'/assets/images/site-image/category/4.jpg',
    path:'/companies',
  },
  {
    name: '',
    key: 'total_veterinary',
    image:'/assets/images/site-image/category/5.jpg',
    path:'/brand/veterinary',
  },
  {
    name: '',
    key: 'total_diagnostic',
    image:'/assets/images/site-image/category/6.jpg',
    path:'/diagnostic/company',
  },
  {
    name: '',
    key: 'total_skin_care',
    image:'/assets/images/site-image/category/7.jpg',
    path:'/brand/dermatology',
  },
  {
    name: '',
    key: 'total_doctor',
    image:'/assets/images/site-image/category/8.jpg',
    path:'/doctors',
  },
  {
    name: '',
    key: 'total_food_supplement',
    image:'/assets/images/site-image/category/9.jpg',
    path:'/brand/food-supplyment',
  },
];
const CategoryGridBlock: React.FC<CategoriesProps> = ({
            className = 'pt-2 pb-2',
          }) => {
  const { width } = useWindowSize();
  const dashboardData = useSelector(getDashboardData);

  return (
      <div className={className}>
        <div className="block 2xl:flex justify-center flex-wrap 3xl:-mx-3.5">
          { width! < 1536 ? (
              <Carousel
                  autoplay={false}
                  breakpoints={breakpoints}
                  buttonGroupClassName="-mt-5 md:-mt-4 lg:-mt-5"
              >
                { items.map((item, index) => (
                        <SwiperSlide key={`category--key-${index}`}>
                          <CategoryCard
                              item={`${item.name} ${dashboardData[item.key]}`}
                              image={item.image}
                              path={item.path}
                          />
                        </SwiperSlide>
                    ))}
              </Carousel>
          ) :  (items.map((item, index) => (
                  <CategoryCard
                      key={`category--key-${index}`}
                      item={`${item.name} ${dashboardData[item.key]}`}
                      image={item.image}
                      path={item.path}
                      className="shrink-0 2xl:px-3.5 2xl:w-[12.5%] 3xl:w-1/9"
                  />
              ))
          )}
        </div>
      </div>
  );
};

export default CategoryGridBlock;
