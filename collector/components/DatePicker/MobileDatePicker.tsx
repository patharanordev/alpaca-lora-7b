'use client'

import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker as MuiMobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';

type Props = {
  id?: string
  value: number | null
  onChange: Function
}

export default function MobileDatePicker(props: Props) {
  const [value, setValue] = React.useState<number | null>(props.value);
  const onChange = (v: number | null) => {
    if (v) {
      setValue(v)
      if (typeof props.onChange === 'function') {
        props.onChange(v)
      }
    }
  } 

  React.useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{ padding:0, margin:0 }}>
        <MuiMobileDatePicker
          value={value ? dayjs.unix(value) : null}
          onChange={(newValue) => newValue 
            ? onChange(newValue.unix()) 
            : onChange(null)
          }
          sx={{ width:'100%' }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}