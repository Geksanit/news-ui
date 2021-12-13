import { InputAdornment } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import { DatePicker } from '@material-ui/pickers';
import React from 'react';
import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';

type Props = {
  control: Control<FieldValues>;
  rules: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  label: string;
  name: string;
  errorMessage: string;
  minDate?: Date;
  maxDate?: Date;
};

const Datepicker = ({ control, rules, label, name, errorMessage, minDate, maxDate }: Props) => (
  <Controller
    defaultValue={null}
    name={name}
    rules={rules}
    control={control}
    render={({ ref, ...rest }, { invalid }) => (
      <DatePicker
        {...rest}
        variant="inline"
        format="dd.MM.yyyy"
        minDate={minDate}
        maxDate={maxDate}
        margin="normal"
        label={label}
        inputRef={ref}
        error={invalid}
        helperText={errorMessage}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <EventIcon />
            </InputAdornment>
          ),
        }}
      />
    )}
  />
);

export { Datepicker };
