import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import Switch from '@components/ui/switch';
import Text from '@components/ui/text';
import useAuth from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../features/user/userApi';
import { useEffect } from 'react';

const defaultValues = {};

const AccountDetails: React.FC = () => {
  // const { mutate: updateUser, isLoading } = useUpdateUserMutation();
  const isLoggedIn = useAuth();
  const router = useRouter();
  if (!isLoggedIn) {
    router.push('/');
  }
  const { data: userData, isLoading, isSuccess } = useGetUserQuery({});

  const [updateUser] = useUpdateUserMutation();

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      address: userData?.address,
      name: userData?.name,
      phone_number: userData?.phone_number,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setValue('name', userData?.name);
      setValue('address', userData?.address);
      setValue('phone_number', userData?.phone_number);
    }
  }, [isLoading, isSuccess, userData]);

  const onSubmit = (data: any) => {
    updateUser(data)
      .unwrap()
      .then((response: any) => {
        if (response?.status) {
          toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error('Sorry Something Wrong Please Try Again', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        toast.error('Sorry Something Wrong Please Try Again', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <div className="flex flex-col w-full">
      <Heading variant="titleLarge" className="mb-5 md:mb-6 lg:mb-7 lg:-mt-1">
        {t('common:text-account-details-personal')}
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full mx-auto"
        noValidate
      >
        <div className="border-b border-border-base pb-7 md:pb-8 lg:pb-10">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                type="text"
                label={t('forms:label-name')}
                {...register('name', {
                  required: 'forms:name-required',
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.name?.message}
              />
              <Input
                type="tel"
                label="Phone/Mobile"
                {...register('phone_number', {
                  required: 'forms:phone-required',
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.phone_number?.message}
              />
            </div>
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                type="text"
                label="Address"
                {...register('address', {
                  required: 'forms:address-required',
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.address?.message}
              />
            </div>
          </div>
          <div className="relative flex pb-2 mt-5 sm:ltr:ml-auto sm:rtl:mr-auto lg:pb-0">
            <Button
              type="submit"
              // loading={isLoading}
              // disabled={isLoading}
              variant="formButton"
              className="w-full sm:w-auto"
            >
              {t('common:button-save-changes')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
