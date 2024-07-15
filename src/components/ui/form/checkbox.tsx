import React from 'react';
import { useTranslation } from 'next-i18next';
interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | any;
  justify?: string;
}
export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, justify = 'justify-between', ...rest }, ref) => {
    const { t } = useTranslation();
    return (
      <label
        className={`group flex items-center ${justify} text-brand-dark text-sm md:text-15px cursor-pointer transition-all hover:text-opacity-80  border-border-base py-3.5 last:border-b-0 last:pb-0 first:pt-0`}
      >
        <span className="ltr:mr-3.5 rtl:ml-3.5 -mt-0.5">
          {label ? t(label) : label}
        </span>
        <input
          type="checkbox"
          className="form-checkbox text-brand-tree w-[22px] h-[22px] border-2 border-border-four rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-brand-tree focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-brand-tree hover:checked:bg-brand-tree"
          ref={ref}
          {...rest}
        />
      </label>
    );
  }
);

CheckBox.displayName = 'CheckBox';
