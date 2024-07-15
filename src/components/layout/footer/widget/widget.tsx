import Container from '@components/ui/container';
import WidgetLink from './widget-link';
import WidgetAbout from './widget-about-us';
import { footer } from '../data';
import Image from '@components/ui/image';
import Link from '@components/ui/link';

interface WidgetsProps {
  widgets: {
    id: number;
    widgetTitle: string;
    lists: any;
  }[];
}

const data = {
  title: 'app-heading',
  description: 'app-description',
  appImage: '/assets/images/app-thumbnail.png',
  appButtons: [
    {
      id: 1,
      slug: '/#',
      altText: 'button-app-store',
      appButton: '/assets/images/app-store.png',
      buttonWidth: 170,
      buttonHeight: 56,
    },
    {
      id: 2,
      slug: '/#',
      altText: 'button-play-store',
      appButton: '/assets/images/play-store.png',
      buttonWidth: 170,
      buttonHeight: 56,
    },
  ],
};

const Widgets: React.FC<WidgetsProps> = ({ widgets }) => {
  const { social } = footer;
  const { appButtons, title, description, appImage } = data;
  return (
    <Container>
      <div className="grid grid-cols-2 md:grid-cols-12 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 pb-[20px]">
          <WidgetAbout
              social={social}
              className="mb-4 border-b col-span-full sm:col-span-1 md:col-span-4 sm:border-b-0 border-border-three sm:mb-0"
          />
          {widgets?.map((widget) => (
              <WidgetLink
                  key={`footer-widget--key${widget.id}`}
                  data={widget}
                  className="pb-3.4 sm:pb-0 sm:col-span-1 md:col-span-2"
              />
          ))}
        <div className="md:col-span-4 col-span-full">
          {appButtons?.map((item) => (
              <Link
                  key={item.id}
                  href={item.slug}
                  className="inline-flex transition duration-200 ease-in hover:box-shadow hover:opacity-80 mx-1 md:mx-1.5"
              >
                <Image
                    src={item.appButton}
                    alt={item.altText}
                    className="rounded-md w-36 lg:w-44 xl:w-auto"
                    width={item.buttonWidth}
                    height={item.buttonHeight}
                />
              </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Widgets;
