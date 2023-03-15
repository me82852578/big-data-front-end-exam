import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  AppBar, Box, Container, Toolbar, Typography,
} from '@mui/material';
import ColChart from './colChart';

const cName = [
  '基隆市',
  '嘉義市',
  '臺北市',
  '嘉義縣',
  '新北市',
  '臺南市',
  '桃園縣',
  '高雄市',
  '新竹市',
  '屏東縣',
  '新竹縣',
  '臺東縣',
  '苗栗縣',
  '花蓮縣',
  '臺中市',
  '宜蘭縣',
  '彰化縣',
  '澎湖縣',
  '南投縣',
  '金門縣',
  '雲林縣',
  '連江縣',
];

const options: Highcharts.Options = {
  xAxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
  series: [
    {
      name: 'Tokyo',
      type: 'column',
      data: [
        49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        95.6, 54.4,
      ],
    },
    {
      name: 'New York',
      type: 'column',
      data: [
        83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6,
        92.3,
      ],
    },
    {
      name: 'London',
      type: 'column',
      data: [
        48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2,
      ],
    },
    {
      name: 'Berlin',
      type: 'column',
      data: [
        42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1,
      ],
    },
  ],
};

const getAllData = async () => {
  const res = await axios({
    method: 'get',
    url: 'https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/110',
    params: {
      // PAGE: '4',
      COUNTY: '臺北市',
      // TOWN: '板橋區',
    },
  });
  return res.data;
};

export default function App() {
  const query = useQuery({
    queryKey: [
      'https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/110',
    ],
    queryFn: getAllData,
  });

  console.info(cName);
  console.info(query.data);

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Logo
          </Typography>
        </Toolbar>
      </AppBar>
      <Box height="100%" display="flex" flexDirection="column" overflow="auto">
        <Container maxWidth="lg" sx={{ height: '100%' }}>
          <Box height="110%">
            <ColChart options={options} />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
