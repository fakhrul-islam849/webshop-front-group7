import React, { useState } from 'react';
import Select, { StylesConfig } from 'react-select';

const Checkbox = ({ children, ...props }) => (
  <label>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

const SingleSelect = ({ options, setValue, placeHolder = 'Please Select' }) => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  const colourStyles = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: 'white',
      borderColor: 'grey',
    }),

    input: (styles) => ({ ...styles, outline: 'none' }),
    placeholder: (styles) => ({ ...styles }),
    singleValue: (styles, { data }) => ({ ...styles }),
  };
  const handleOnChange = (e) => {
    if (e) {
      setValue(e.value);
    } else {
      setValue(null);
    }
  };
  return (
    <>
      <Select
        classNames={{
          control: (state) =>
            state.isFocused ? 'border-focus-600' : 'border-grey-300',
        }}
        classNamePrefix="select"
        placeholder={placeHolder}
        defaultValue={options[0]}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
        options={options}
        styles={colourStyles}
        onChange={(e) => handleOnChange(e)}
        theme={(theme) => ({
          ...theme,
          borderRadius: '4px',
          colors: {
            ...theme.colors,
            primary25: '#02b290',
            primary: '#02b290',
          },
        })}
      />
    </>
  );
};

export default SingleSelect;
