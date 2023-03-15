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
  title: {},
  chart: {
    type: 'column',
    // marginTop: 40,
    // marginLeft: 50,
  },
  xAxis: {
    categories: [],
    crosshair: true,
  },
  yAxis: {
    title: {
      text: '',
    //   align: 'high',
    //   rotation: 0,
    //   style: { fontSize: '16px', color: 'black' },
    //   y: -25,
    //   x: 55,
    },
  },
  //   tooltip: {
  //     pointFormat: '{point.series.name}: {point.y:,.2f}',
  //   },
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
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
}

export default ColChart;
