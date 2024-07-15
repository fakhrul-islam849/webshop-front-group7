interface AlertProps {
  message?: string;
  className?: string;
}

const NoDataFound: React.FC<AlertProps> = ({
  message = 'Sorry No Data Found',
  className,
}) => {
  return (
    <div
      className={`w-full h-full py-4 px-5 text-13px md:text-sm text-brand-dark font-semibold flex items-center justify-center border border-brand/40 rounded ${className}`}
    >
      {message}
    </div>
  );
};

export default NoDataFound;
