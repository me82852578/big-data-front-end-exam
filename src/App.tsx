import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  AppBar,
  Box,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import ColChart from './colChart';
import PieChart from './pieChart';

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

const getAllData = async () => {
  const res = await axios({
    method: 'get',
    url: 'https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/110',
    params: {
      // PAGE: '4',
      COUNTY: '臺北市',
      TOWN: '大安區',
    },
  });
  return res.data;
};

export default function App() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/110',
    ],
    queryFn: getAllData,
    select: (resData) => {
      const sum: {
        ordinaryM: number;
        ordinaryF: number;
        ordinaryTotal: number;
        singleM: number;
        singleF: number;
        singleTotal: number;
      } = resData.responseData.reduce(
        (
          acc: {
            ordinaryM: number;
            ordinaryF: number;
            ordinaryTotal: number;
            singleM: number;
            singleF: number;
            singleTotal: number;
          },
          curr: {
            household_ordinary_m: string;
            household_ordinary_f: string;
            household_ordinary_total: string;
            household_single_m: string;
            household_single_f: string;
            household_single_total: string;
          },
        ) => {
          const {
            ordinaryM: aom,
            ordinaryF: aof,
            ordinaryTotal: aot,
            singleM: asm,
            singleF: asf,
            singleTotal: ast,
          } = acc;

          const {
            household_ordinary_m: com,
            household_ordinary_f: cof,
            household_ordinary_total: cot,
            household_single_m: csm,
            household_single_f: csf,
            household_single_total: cst,
          } = curr;

          return {
            ...acc,
            ordinaryM: aom + parseInt(com, 10),
            ordinaryF: aof + parseInt(cof, 10),
            ordinaryTotal: aot + parseInt(cot, 10),
            singleM: asm + parseInt(csm, 10),
            singleF: asf + parseInt(csf, 10),
            singleTotal: ast + parseInt(cst, 10),
          };
        },
        {
          ordinaryM: 0,
          ordinaryF: 0,
          ordinaryTotal: 0,
          singleM: 0,
          singleF: 0,
          singleTotal: 0,
        },
      );

      const colOptions: Highcharts.Options = {
        xAxis: {
          categories: ['共同生活', '獨立生活'],
        },
        series: [
          {
            name: '男性',
            color: '#42a5f5',
            type: 'column',
            data: [sum.ordinaryM, sum.singleM],
          },
          {
            name: '女性',
            color: '#e57373',
            type: 'column',
            data: [sum.ordinaryF, sum.singleF],
          },
        ],
      };

      const pieOptions: Highcharts.Options = {
        series: [
          {
            name: '戶數',
            colorByPoint: true,
            type: 'pie',
            data: [
              {
                name: '共同生活',
                y: sum.ordinaryTotal,
                color: '#ce93d8',
              },
              {
                name: '獨立生活',
                y: sum.singleTotal,
                color: '#f3e5f5',
              },
            ],
          },
        ],
      };

      return {
        pieOptions,
        colOptions,
      };
    },
  });

  console.info(cName);

  return (
    <Stack height="100%" overflow="hidden" spacing={1}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Logo
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        position="relative"
        display="flex"
        width="100%"
        height="100%"
        overflow="hidden"
      >
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
            letterSpacing="50px"
            marginBottom="-50px"
            sx={{ writingMode: 'vertical-lr' }}
            fontWeight={700}
          >
            TAIPEI
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          height="100%"
          flexGrow={1}
          overflow="auto"
          paddingX={2}
        >
          <Stack height="fit-content" width={{ xs: '100%', md: '80%' }} spacing={10}>
            <Box width="100%" height={{ xs: 'fit-content', md: '600px' }} overflow="hidden">
              {!data || isLoading || isFetching ? (
                <Skeleton width="100%" height="100%" variant="rectangular" />
              ) : (
                <ColChart
                  options={data.colOptions}
                />
              )}
            </Box>
            <Box width="100%" height={{ xs: 'fit-content', md: '600px' }} overflow="hidden">
              {!data || isLoading || isFetching ? (
                <Skeleton width="100%" height="100%" variant="rectangular" />
              ) : (
                <PieChart options={data.pieOptions} />
              )}
            </Box>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
}
