import React, { useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

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
      x: 40,
    },
  },
  tooltip: {
    shared: true,
    // pointFormat: '{point.series.name}: {point.y:,.2f}',
  },
  plotOptions: {
    // column: {
    //   showInLegend: false,
    //   dataLabels: {
    //     enabled: true,
    //     crop: false,
    //     overflow: 'allow',
    //     style: {
    //       fontSize: '16px',
    //       fontWeight: 'border',
    //       textOutline: 'none',
    //     },
    //   },
    //   events: {
    //     click: typeof onColumnClick === 'function' ? onColumnClick : undefined,
    //   },
    //   cursor: typeof onColumnClick === 'function' ? 'pointer' : 'default',
    // },
  },
  series: [],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 400,
      },
      chartOptions: {
        plotOptions: {
          column: {
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

function ColChart({ options: optionsProp }:HighchartsReact.Props) {
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

export default ColChart;
