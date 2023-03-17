import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';
import { Outlet } from 'react-router-dom';
import AreaBrand from './areaBrand';

export default function MainLayout() {
  return (
    <Stack height="100%" overflow="hidden" spacing={1}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Logo
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.5)',
              minWidth: 0,
              p: 0.5,
              borderRadius: '8px',
            }}
          >
            <SettingsOutlined sx={{ color: 'white' }} fontSize="small" />
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        position="relative"
        display="flex"
        width="100%"
        height="100%"
        overflow="hidden"
      >
        <AreaBrand area="TAIWAN" />
        <Box
          display="flex"
          justifyContent="center"
          height="100%"
          flexGrow={1}
          overflow="auto"
          paddingX={{ xs: 1, sm: 2 }}
        >
          <Outlet />
        </Box>
      </Box>
    </Stack>
  );
}
