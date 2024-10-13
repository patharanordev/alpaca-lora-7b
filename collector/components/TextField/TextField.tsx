import * as React from 'react';
import { TextField as MuiTextField } from '@mui/material';

type Props = {
    id?: string
    label: string
    value: string
    onChange: Function
}

export default function TextField(props: Props) {
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
        <MuiTextField 
            id={props.id} 
            label={props.label} 
            variant="outlined" 
            value={value}
            sx={{
                width: "100%"
            }}
            onChange={onChange}
        />
    )
}