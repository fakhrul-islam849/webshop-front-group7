import React from 'react';

type DrugDetailsActionProps = {
  item?: any;
};
const DrugDetailsAction: React.FC<DrugDetailsActionProps> = ({ item }) => {
  const { title } = item || {};

  const uniqueId = `${title.replace(/\s+/g, '-').toLowerCase()}`;
  const handleScroll = (uniqueId: string) => {
    const scrollElement = document.getElementById(uniqueId);
    scrollElement?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };
  return (
    <div
      onClick={() => handleScroll(uniqueId)}
      className="bg-cyan-700 text-brand-light pt-2 pb-2 pl-4 pr-4 cursor-pointer"
    >
      {title}
    </div>
  );
};

export default DrugDetailsAction;
