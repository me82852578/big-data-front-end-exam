import {
  Box, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CloseRounded } from '@mui/icons-material';
import { PieChart, PieSkeleton } from './pieChart';
import { ColChart, ColSkeleton } from './colChart';
import { FormValues } from '../types';
import NotFound from '../../notFound';

const getAllData = async ({ params }:{ params:FormValues }) => {
  const res = await axios({
    method: 'get',
    url: `https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${params.year}`,
    params: {
      COUNTY: params.county,
      TOWN: params.town,
    },
  });

  if (res.data.responseCode !== 'OD-0101-S') throw new Error(`API(ODRP019): ${res.data.responseMessage}`);

  return res.data;
};

export default function Results() {
  const queryParams = useParams<FormValues>();
  const theme = useTheme();
  const [detailDialog, setDetailDialog] = useState('');

  const {
    data, isLoading, isFetching, isError,
  } = useQuery({
    queryKey: [queryParams],
    queryFn: () => getAllData({ params: queryParams }),
    select: (resData: {
      responseCode:'OD-0102-S' | 'OD-0101-S'
      responseData:{
        household_ordinary_m: string;
        household_ordinary_f: string;
        household_ordinary_total: string;
        household_single_m: string;
        household_single_f: string;
        household_single_total: string;
      }[]
    }) => {
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
        plotOptions: {
          column: {
            cursor: 'pointer',
            point: {
              events: {
                click({ point }) {
                  setDetailDialog(`${point.series.name} ${point.category} ${point.y} 人。`);
                },
              },
            },
          },
        },
        xAxis: {
          categories: ['共同生活', '獨立生活'],
        },
        series: [
          {
            name: '男性',
            color: theme.palette.secondary.dark,
            type: 'column',
            data: [sum.ordinaryM, sum.singleM],
          },
          {
            name: '女性',
            color: theme.palette.secondary.light,
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
                color: theme.palette.tertiary.dark,
              },
              {
                name: '獨立生活',
                y: sum.singleTotal,
                color: theme.palette.tertiary.light,
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

  if (isError) {
    return <NotFound />;
  }

  return (
    <Stack width="100%" spacing={{ xs: 4, md: 6 }}>
      <Typography
        component="h3"
        variant="h4"
        textAlign="center"
      >
        {`${queryParams.year}年 ${queryParams.county} ${queryParams.town}`}
      </Typography>
      <Box
        width="100%"
        height={{ xs: 'fit-content', md: '600px' }}
        overflow="hidden"
      >
        {!data || isLoading || isFetching ? (
          <ColSkeleton />
        ) : (
          <ColChart options={data.colOptions} />
        )}
      </Box>
      <Box
        width="100%"
        height={{ xs: 'fit-content', md: '600px' }}
        overflow="hidden"
      >
        {!data || isLoading || isFetching ? (
          <PieSkeleton />
        ) : (
          <PieChart options={data.pieOptions} />
        )}
      </Box>
      <Dialog fullWidth maxWidth="xs" open={!!detailDialog} onClose={() => setDetailDialog('')}>
        <DialogTitle
          sx={{
            m: 0,
            px: 2,
            py: 1,
            backgroundColor: 'primary.light',
            color: 'primary.contrastText',
          }}
        >
          Detail
          <IconButton
            onClick={() => setDetailDialog('')}
            sx={{
              position: 'absolute',
              right: 4,
              top: 4,
              color: 'primary.contrastText',
            }}
          >
            <CloseRounded />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: '16px !important' }}>
          <Typography variant="subtitle1">
            {detailDialog}
          </Typography>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
