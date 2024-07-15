import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@components/ui/form/input';
import { useTranslation } from 'next-i18next';
import EmailIcon from '@components/icons/email-icon';
import SendIcon from '@components/icons/send-icon';
import Text from '@components/ui/text';
import Heading from '@components/ui/heading';
import { useRouter } from 'next/router';
import { getDirection } from '@utils/get-direction';
import cn from 'classnames';
import { useSubscriptionSubmitMutation } from 'src/features/contact/subscriptionApi';
import { toast } from 'react-toastify';

interface Props {
  className?: string;
}
interface NewsLetterFormValues {
  email: string;
}
const defaultValues = {
  email: '',
};
const WidgetSubscription: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsLetterFormValues>({
    defaultValues,
  });
  const [subscriptionSuccess, setSubscriptionSuccess] =
    useState<Boolean>(false);

  const [subscriptionSubmit] = useSubscriptionSubmitMutation();

  function onSubmit(values: NewsLetterFormValues, e: any) {
    const newData = {name: values.email};
    subscriptionSubmit(newData)
        .unwrap()
        .then((response) => {
          if (response.status) {
            setSubscriptionSuccess(true);
            // reset form after submit
            e.target.reset();
          } else {
            toast.error('Email Already Exist, Give New', {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((error) => {
          toast.error('Sorry Something Wrong Please Try Again', {
            position: toast.POSITION.TOP_RIGHT,
          });
        });


    // remove success message after 3 seconds
    setTimeout(() => {
      setSubscriptionSuccess(false);
    }, 5000);


  }

  const { locale } = useRouter();
  const dir = getDirection(locale);
  return (
    <div className={cn('flex flex-col', className)}>
      <p className="pl-3 text-white font-semibold mt-4 mb-2">Drugx Newsletters</p>
      <form
        noValidate
        className="relative pl-3 max-w-[500px] min-w-[230px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="pl-6 flex items-center absolute ltr:left-0 rtl:right-0 top-0 h-12 px-3.5 transform">
          <EmailIcon className="w-4 2xl:w-[18px] h-4 2xl:h-[18px]" />
        </span>
        <Input
          placeholder={t('forms:placeholder-email-subscribe')}
          type="email"
          id="subscription-email"
          variant="solid"
          className="w-full"
          inputClassName="ltr:pl-10 rtl:pr-10 2xl:px-11 h-12 rounded-md"
          {...register('email', {
            required: `${t('forms:email-required')}`,
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: `${t('forms:email-error')}`,
            },
          })}
          error={errors.email?.message}
        />
        {!errors.email && subscriptionSuccess && (
          <p className="my-2 text-13px text-brand">
            {t('common:text-subscription-success-msg')}
          </p>
        )}
        <button
          className="absolute ltr:right-0 rtl:left-0 top-0 hover:opacity-80 focus:outline-none h-12 px-3 lg:px-3.5 transform scale-90 2xl:scale-100"
          aria-label="Subscribe Button"
        >
          <SendIcon
            className={`w-[18px] 2xl:w-5 h-[18px] 2xl:h-5 ${
              dir === 'rtl' && 'transform rotate-180'
            }`}
          />
        </button>
      </form>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <p className="pl-3 pt-4 text-white hidden lg:inline">Get trustworthy and actionable health and wellness information in your inbox. Your <u><a href="/page/2/privacy-&-policy">privacy</a></u> is important to us.</p>
    </div>
  );
};

export default WidgetSubscription;
