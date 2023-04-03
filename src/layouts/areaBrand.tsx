import React from 'react';
import { Box } from '@mui/material';

type AreaBrandProps = {
  area: string
};

export default function AreaBrand({ area = 'TAIWAN' }: AreaBrandProps) {
  const patternHeight = area.length * 166;

  return (
    <Box
      position={{ xs: 'fixed', md: 'relative' }}
      width="146px"
      height="100%"
      sx={{
        opacity: { xs: 0.1, md: 1 },
      }}
    >
      <svg width="100%" height="100%">
        <defs>
          <linearGradient id="rainbow" x1="0" x2="100%" y1="0" y2="0">
            <stop stopColor="#e60000" offset="0%" />
            <stop stopColor="#ffcc00" offset="33.33%" />
            <stop stopColor="#007f00" offset="66.66%" />
            <stop stopColor="#0000cc" offset="100%" />
          </linearGradient>
          <pattern id="Text" width="100%" height={patternHeight} patternUnits="userSpaceOnUse">
            <text
              x="-70"
              y="70"
              fontSize="200px"
              fill="url(#rainbow)"
              transform="rotate(90 0 70)"
              fontWeight={700}
              letterSpacing="23px"
            >
              {area}
            </text>
          </pattern>
        </defs>
        <rect fill="url(#Text)" width="100%" height="100%" />
      </svg>
    </Box>
  );
}
