import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ManagedUIContext } from '@contexts/ui.context';
import ManagedModal from '@components/common/modal/managed-modal';
import ManagedDrawer from '@components/common/drawer/managed-drawer';
import { useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from 'react-query/devtools';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from '@components/seo/default-seo';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Head from 'next/head';

// external
import 'react-toastify/dist/ReactToastify.css';

// base css file
import '@assets/css/scrollbar.css';
import '@assets/css/swiper-carousel.css';
import '@assets/css/custom-plugins.css';
import '@assets/css/globals.css';
import { getDirection } from '@utils/get-direction';

const Noop: React.FC = ({ children }) => <>{children}</>;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();
  const dir = getDirection(router.locale);
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
  const Layout = (Component as any).Layout || Noop;

  const defaultTitle = "Largest Online Medicine Index of Bangladesh";
  const defaultDescription = "Explore drugx for an extensive database of medications, Indications, dosage instructions, Interaction, side effects, veterinary, update price & diagnostic test cost";
  const defaultImage = 'https://www.drugx.com.bd/assets/images/site-image/meta-logo.png';
  const defaultPath = 'https://www.drugx.com.bd';
  const defaultKeyword = 'The largest online directory of medications. To find out more about any drugs pharmacology, use, side effects, price, dosage, and administration, just go Drugx.';
  const { openGraphData = [] } = pageProps;

  const title = openGraphData?.title ? openGraphData?.title : defaultTitle;
  const description = openGraphData?.description ? openGraphData?.description : defaultDescription;
  const image = openGraphData?.image ? openGraphData?.image : defaultImage;
  const keyword = openGraphData?.keyword ? openGraphData?.keyword : defaultKeyword;
  const path = openGraphData?.path ? openGraphData?.path : defaultPath;
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <ManagedUIContext>
            <>
              {/*<DefaultSeo />*/}
              <Head>
                <title>{title} | Drugx</title>
                <meta name="keywords" content={keyword} />
                <meta name="subject" content="Online Drug Portal" />
                <meta name="description" content={description} key="desc" />
                <meta name="language" content="ES" />
                <meta name="author" content="Md Fakhrul Islam, fakhrulislam739@gmail.com" />
                <meta name="og:type" content="website"/>
                <meta property="og:title" content={title} key="title" />
                <meta property="og:description" content={description} key="description" />
                <meta property="og:image" content={image} key="image" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta content="yes" name="apple-touch-fullscreen" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black" />
                <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1" />
                <link  rel="canonical" href={`https://www.drugx.com.bd${path}`} />
              </Head>
              <Layout pageProps={pageProps}>
                <Component {...pageProps} key={router.route} />
              </Layout>
              <ToastContainer />
              <ManagedModal />
              <ManagedDrawer />
            </>
          </ManagedUIContext>
        </Hydrate>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </Provider>
  );
};

export default appWithTranslation(CustomApp);
