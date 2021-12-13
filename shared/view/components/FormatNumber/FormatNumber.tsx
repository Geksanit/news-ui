import { TextField } from '@material-ui/core';
import React from 'react';
import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import NumberFormat from 'react-number-format';

type Props = {
  control: Control<FieldValues>;
  label: string;
  name: string;
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  mask?: string;
  format?: string;
  prefix?: string;
  thousandSeparator?: boolean;
  errorMessage?: string;
};

const FormatNumber = ({
  control,
  rules,
  label,
  name,
  mask,
  format,
  prefix,
  thousandSeparator,
  errorMessage,
}: Props) => (
  <Controller
    defaultValue={null}
    name={name}
    rules={rules}
    control={control}
    render={({ ref, onChange, ...rest }, { invalid }) => (
      <NumberFormat
        {...rest}
        error={invalid}
        helperText={errorMessage}
        label={label}
        mask={mask}
        customInput={TextField}
        prefix={prefix}
        format={format || null}
        type="text"
        inputRef={ref}
        thousandSeparator={thousandSeparator ? ' ' : null}
        onValueChange={({ value }) => onChange(value)}
      />
    )}
  />
);

export { FormatNumber };
