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
    type: 'pie',
    backgroundColor: 'transparent',
  },
  title: {
    text: '戶數統計',
    style: { fontSize: '24px', fontWeight: 'bold' },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        distance: 10,
        // format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        format: '{point.percentage:.2f} %',
        style: {
          fontSize: '16px',
          fontWeight: 'bolder',
          textOutline: 'none',
        },
      },
      showInLegend: true,
    },
  },
  series: [],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 400,
      },
      chartOptions: {
        plotOptions: {
          pie: {
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

export function PieChart({ options: optionsProp }:HighchartsReact.Props) {
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

export function PieSkeleton() {
  return (
    <Stack width="95%" mx="auto" alignItems="center" spacing={3}>
      <Skeleton variant="text" height="50px" width="30%" />
      <Skeleton
        width="40vw"
        height="40vw"
        variant="circular"
        sx={{
          maxWidth: '500px',
          maxHeight: '500px',
          minHeight: '250px',
          minWidth: '250px',
          mx: 'auto',
        }}
      />
    </Stack>
  );
}
