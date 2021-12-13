import { Button } from '@material-ui/core';
import { AddCircle, Done } from '@material-ui/icons';
import React from 'react';
import { Control, FieldValues, useWatch } from 'react-hook-form';

import styles from './FileUpload.module.scss';

type Props = {
  control: Control<FieldValues>;
  text: string;
  name: string;
};

const FileUpload = ({ control, text, name }: Props) => {
  const file = useWatch({ control, name, defaultValue: null });

  return (
    <label className={styles.file}>
      <input
        type="file"
        name={name}
        className={styles.fileInput}
        accept=".jpg, .jpeg"
        ref={control.register({ required: true })}
      />
      <Button
        variant="outlined"
        color="primary"
        size="small"
        component="span"
        endIcon={file && file[0] ? <Done /> : <AddCircle />}
        className={styles.button}
      >
        {text}
      </Button>
    </label>
  );
};

export { FileUpload };
