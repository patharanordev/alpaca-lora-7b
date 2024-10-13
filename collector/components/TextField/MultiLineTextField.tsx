import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type Props = {
    id?: string
    label: string
    rows: number
    value: string
    onChange: Function
}

export default function MultiLineTextField(props: Props) {
  const [value, setValue] = React.useState<string>(props.value)
  
  const onChange = (e: any) => {
    setValue(e.target.value)

    if (typeof props.onChange === 'function') {
      props.onChange(e.target.value)
    }
  }

  React.useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id={props.id}
          label={props.label}
          multiline
          rows={props.rows}
          value={value}
          onChange={onChange}
        />
      </div>
    </Box>
  );
}