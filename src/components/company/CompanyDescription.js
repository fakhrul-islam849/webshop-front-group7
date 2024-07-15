import React from 'react';

const CompanyDescription = ({ info }) => {
  const { description } = info;
  return (
    <div>
      <div
        className="pl-2"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  );
};

export default CompanyDescription;
