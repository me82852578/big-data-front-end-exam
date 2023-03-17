import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Autocomplete,
  Button,
  MenuItem,
  TextField,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import taiwanDistricts from '../../assets/data/taiwanDistricts.json';

type FormValues = {
  county?: string;
  town?: string;
  year: string;
};

type FormProps = {
  onSubmit?: (e: FormValues) => void;
};

export default function Form({ onSubmit }: FormProps) {
  const {
    control, handleSubmit, watch, formState,
  } = useForm<FormValues>({
    defaultValues: {
      county: '',
      town: '',
      year: '110',
    },
  });

  const handleOnSubmit = handleSubmit((e) => {
    if (typeof onSubmit === 'function') {
      onSubmit(e);
    }
  });

  return (
    <Grid component="form" container onSubmit={handleOnSubmit} spacing={2}>
      <Grid xs={12} sm="auto">
        <Controller
          name="year"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              label="年份"
              select
              InputLabelProps={{ shrink: true }}
              size="small"
              {...field}
              sx={{ minWidth: '100px' }}
            >
              {['106', '107', '108', '109', '110'].map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid xs={12} sm="auto">
        <Controller
          name="county"
          control={control}
          rules={{ required: true }}
          render={({ field }) => {
            const { onChange, value, ...otherFields } = field;
            return (
              <Autocomplete
                options={taiwanDistricts}
                getOptionLabel={(opt) => opt.name || ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="縣/市"
                    InputLabelProps={{ shrink: true }}
                    placeholder="請選擇 縣/市"
                    size="small"
                  />
                )}
                onChange={(e, newVal) => {
                  onChange(newVal ? newVal.name : '');
                }}
                onInputChange={(e, v, reason) => {
                  if (reason === 'clear') {
                    onChange('');
                  }
                }}
                sx={{ minWidth: '200px' }}
                {...otherFields}
              />
            );
          }}
        />
      </Grid>
      <Grid xs={12} sm="auto">
        <Controller
          name="town"
          control={control}
          rules={{ required: true }}
          render={({ field }) => {
            const { onChange, value, ...otherFields } = field;
            const county = watch('county');
            const findDistrict = taiwanDistricts.find(
              (opt) => opt.name === county,
            )?.districts;
            return (
              <Autocomplete
                disabled={!findDistrict}
                options={findDistrict || [{ name: '', zip: '' }]}
                getOptionLabel={(opt) => opt.name || ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="區"
                    InputLabelProps={{ shrink: true }}
                    placeholder={findDistrict ? '請選擇 區' : '請先選擇 縣/市'}
                    size="small"
                  />
                )}
                onChange={(e, newVal) => {
                  onChange(newVal ? newVal.name : '');
                }}
                onInputChange={(e, v, reason) => {
                  if (reason === 'clear') {
                    onChange('');
                  }
                }}
                sx={{ minWidth: '200px' }}
                {...otherFields}
              />
            );
          }}
        />
      </Grid>
      <Grid xs={12} sm="auto">
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!formState.isValid}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
