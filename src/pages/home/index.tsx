import {
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Form from './form';
import { FormValues } from './types';

export default function Home() {
  const navigate = useNavigate();

  const handleOnSubmit = (e:FormValues) => {
    navigate(`${e.year}/${e.county}/${e.town}`);
  };

  return (
    <Stack
      height="fit-content"
      width={{ xs: '100%', md: '80%' }}
      py={2}
      alignItems="center"
      spacing={{ xs: 4, md: 6 }}
    >
      <Typography component="h2" variant="h4" textAlign="center">人口數、戶數按戶別及性別統計</Typography>
      <Form onSubmit={handleOnSubmit} />
      <Divider sx={{
        width: '100%',
        '&::before': { borderColor: 'secondary.light' },
        '&::after': { borderColor: 'secondary.light' },
      }}
      >
        <Chip variant="outlined" color="secondary" label="搜尋結果" />
      </Divider>
      <Outlet />
    </Stack>
  );
}
