import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Info } from '@mui/icons-material';

export default function TransitionAlerts({mensaje}) {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {mensaje}
        </Alert>
      </Collapse>
      <Button
        disabled={open}
        variant="outlined"
        sx={
            !open && {borderColor:'#4fd1c5'}
        }
        onClick={() => {
          setOpen(true);
        }}
      >
        <Info className={!open ? 'text-custom-300' : 'text-gray-500'}/>
      </Button>
    </Box>
  );
}