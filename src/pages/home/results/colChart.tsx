import React, { useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Skeleton, Stack } from '@mui/material';

Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
  },
  credits: {
    enabled: false,
  },
});

const defaultOptions: Highcharts.Options = {
  chart: {
    type: 'column',
    marginTop: 90,
    backgroundColor: 'transparent',
    marginLeft: 50,
  },
  title: {
    text: '人口數統計',
    style: { fontSize: '24px', fontWeight: 'bold' },
  },
  xAxis: {
    title: {
      text: '型態',
      style: { fontSize: '16px', color: 'black', fontWeight: 'bold' },
    },
    categories: [],
    crosshair: true,
  },
  yAxis: {
    title: {
      text: '數量',
      align: 'high',
      rotation: 0,
      style: { fontSize: '16px', color: 'black', fontWeight: 'bold' },
      y: -25,
      x: 50,
    },
    softMax: 20000,

  },
  tooltip: {
    shared: true,
    // pointFormat: '{point.series.name}: {point.y:,.2f}',
  },
  plotOptions: {
    column: {
      groupPadding: 0.25,
      dataLabels: {
        enabled: true,
        crop: false,
        overflow: 'allow',
        style: {
          fontSize: '16px',
          fontWeight: 'bolder',
          textOutline: 'none',
        },
      },
    },
  },
  series: [],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500,
      },
      chartOptions: {
        plotOptions: {
          column: {
            groupPadding: 0.2,
            dataLabels: {
              style: {
                fontSize: '12px',
              },
            },
          },
        },
      },
    }],
  },
};

export function ColChart({ options: optionsProp }:HighchartsReact.Props) {
  const [options, setOptions] = useState(defaultOptions);

  useEffect(() => {
    if (optionsProp) {
      setOptions(optionsProp);
    }
  }, [optionsProp]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ style: { height: '100%' } }}
    />
  );
}

export function ColSkeleton() {
  return (
    <Stack width="95%" mx="auto" alignItems="center" spacing={3}>
      <Skeleton variant="text" height="50px" width="55%" />
      <Skeleton
        width="100%"
        height="35vw"
        variant="rectangular"
        sx={{ minHeight: '200px' }}
      />
    </Stack>
  );
}
