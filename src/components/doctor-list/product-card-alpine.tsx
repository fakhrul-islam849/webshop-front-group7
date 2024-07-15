/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
import cn from 'classnames';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import { Eye } from '@components/icons/eye-icon';
import { doctorImage } from '@assets/placeholders';
import { useTranslation } from 'next-i18next';

interface ProductProps {
  product: any;
  className?: string;
}
function RenderPopupOrAddToCart({ props }: { props: Object }) {
  let { data }: any = props;
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const iconSize = width! > 1024 ? '19' : '17';
  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }

  return (
    <button
      className="inline-flex items-center justify-center w-8 h-8 text-4xl rounded-full bg-brand lg:w-10 lg:h-10 text-brand-light focus:outline-none focus-visible:outline-none"
      aria-label="Count Button"
      onClick={handlePopupView}
    >
      <Eye width={iconSize} height={iconSize} opacity="1" />
    </button>
  );
}
const ProductCardAlpine: React.FC<ProductProps> = ({ product, className }) => {
  const {
    name,
    image: icon,
    designation,
    qualification,
    specialty,
    language_spoken,
    chember_time,
    institute,
  } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');

  function handlePopupView() {
    // openModal('PRODUCT_VIEW', product);
  }
  return (
    <article
      className={cn(
        'flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:bg-cyan-100 relative h-full',
        className
      )}
      onClick={handlePopupView}
      title={name}
    >
      <div className="relative shrink-0">
        <div className="flex overflow-hidden max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <img
            alt="common:text-logo"
            width={250}
            height={150}
            src={
              icon
                ? `${process.env.NEXT_PUBLIC_REST_API_IMAGE_URM}${icon}`
                : '/assets/images/doctor.png'
            }
          />
        </div>
        <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          <div className={`block product-count-button-position`}>
            {/* <RenderPopupOrAddToCart props={{ data: product }} /> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
        <div className="mb-1 lg:mb-1.5 -mx-1">
          <h3 className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
            {name}
          </h3>
        </div>
        <div className="text-neutral-700">
          <div className="mt-auto text-14px sm:text-sm">
            <h5 className="font-semibold">Designation</h5> : {designation}
          </div>
          <div className="mt-auto text-14px sm:text-sm">
            <span className="font-semibold">Qualification</span> : {qualification}
          </div>
          <div className="mt-auto text-14px sm:text-sm">
            <h4 className="font-semibold">Specialty</h4> : {specialty}
          </div>
          {institute &&(
              <div className="mt-auto text-14px sm:text-sm">
                <span className="font-semibold">Institute</span> : {institute}
              </div>
          )}
          <div className="mt-auto text-14px sm:text-sm">
            <span className="font-semibold">Language</span> : {language_spoken}
          </div>
          <div className="mt-auto text-14px sm:text-sm">
            <span className="font-semibold">Chamber Time</span> : {chember_time}
          </div>
          <div className="mt-auto text-14px sm:text-sm text-amber-900 font-semibold">
            * Chamber time might be changed please contact the appointment number. *
          </div>
        </div>

      </div>
    </article>
  );
};

export default ProductCardAlpine;
