import React from 'react';
import { Box, Typography } from '@mui/material';

type AreaBrandProps = {
  area: string
};

export default function AreaBrand({ area = 'TAIWAN' }: AreaBrandProps) {
  return (
    <Box
      position={{ xs: 'fixed', md: 'relative' }}
      display="flex"
      flexShrink={0}
      alignItems="baseline"
      height="100%"
      overflow="hidden"
      sx={{
        backgroundImage:
              'linear-gradient(to bottom, #e60000, #ffcc00, #007f00, #0000cc)',
        backgroundClip: 'text',
        color: 'transparent',
        opacity: { xs: 0.1, md: 1 },
      }}
    >
      <Typography
        fontSize="200px"
        lineHeight="73.5%"
        letterSpacing="23px"
        marginBottom="-50px"
        sx={{ writingMode: 'vertical-lr' }}
        fontWeight={700}
      >
        {area}
      </Typography>
    </Box>
  );
}
