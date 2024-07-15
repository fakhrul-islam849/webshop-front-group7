import { useTranslation } from 'next-i18next';
import useWindowSize from '@utils/use-window-size';
import Breadcrumb from '@components/ui/breadcrumb';
import cn from 'classnames';

interface HeaderProps {
  backgroundThumbnail?: string;
  heroTitle?: string;
  mobileBackgroundThumbnail?: string;
  variant?: 'default' | 'white';
  className?: string;
}

const PageHeroSection: React.FC<HeaderProps> = ({
  backgroundThumbnail = '/assets/images/page-hero-bg.png',
  heroTitle = 'text-page-title',
  mobileBackgroundThumbnail = '/assets/images/page-hero-bg-mobile.png',
  variant = 'default',
  className = '',
}) => {
  const { width } = useWindowSize();
  return (
    <div
      className={`min-h-[180px] lg:min-h-[200px] xl:min-h-[220px] w-full bg-hero bg-no-repeat bg-cover bg-center`}
      style={{
        backgroundImage: `url(${
          width! > 560 ? backgroundThumbnail : mobileBackgroundThumbnail
        })`,
      }}
    >
    </div>
  );
};

export default PageHeroSection;
