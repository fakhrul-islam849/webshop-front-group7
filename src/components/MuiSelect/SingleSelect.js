import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SingleSelect({ options, value, setValue, placeholder }) {

  const handleChange = (event) => {
    // setAge(event.target.value);
    setValue(event.target.value);
  };

  return (
    <FormControl size="small">
       <InputLabel>{placeholder}</InputLabel>
      <Select
        sx={{ maxWidth: '160px', minWidth: '150px' }}
        label={placeholder}
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {options.length > 0 &&
          options.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
