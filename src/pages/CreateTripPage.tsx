import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MainLayout from '../components/layout/MainLayout';
import tripService, { CreateTripRequest } from '../services/tripService';

// Available activity options
const activityOptions = [
  '历史景点',
  '自然风光',
  '美食',
  '购物',
  '博物馆',
  '主题公园',
  '海滩',
  '徒步',
  '文化体验',
  '夜生活',
  '温泉',
  '摄影',
];

// Budget options
const budgetOptions = ['经济', '中等', '高端', '奢华'];

// Accommodation options
const accommodationOptions = ['经济型酒店', '中档酒店', '豪华酒店', '民宿', '青年旅舍', '露营'];

const CreateTripPage: React.FC = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [budget, setBudget] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form validation
  const [errors, setErrors] = useState({
    destination: false,
    startDate: false,
    endDate: false,
    budget: false,
    accommodation: false,
    activities: false,
  });

  const handleActivityToggle = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(item => item !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const validateForm = () => {
    const newErrors = {
      destination: !destination,
      startDate: !startDate,
      endDate: !endDate,
      budget: !budget,
      accommodation: !accommodation,
      activities: selectedActivities.length === 0,
    };

    setErrors(newErrors);

    // Check if end date is after start date
    if (startDate && endDate && startDate > endDate) {
      setError('结束日期必须晚于开始日期');
      return false;
    }

    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    const tripData: CreateTripRequest = {
      destination,
      start_date: startDate!.toISOString().split('T')[0],
      end_date: endDate!.toISOString().split('T')[0],
      preferences: {
        budget,
        accommodation_type: accommodation,
        activities: selectedActivities,
      },
    };

    try {
      setLoading(true);
      const newTrip = await tripService.createTrip(tripData);
      navigate(`/trips/${newTrip.id}`);
    } catch (error) {
      console.error('Error creating trip:', error);
      setError('创建旅行计划失败，请稍后再试');
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        创建新旅行计划
      </Typography>

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mt: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="destination"
                label="目的地"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                error={errors.destination}
                helperText={errors.destination ? '请输入目的地' : ''}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="开始日期"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      error: errors.startDate,
                      helperText: errors.startDate ? '请选择开始日期' : '',
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="结束日期"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      error: errors.endDate,
                      helperText: errors.endDate ? '请选择结束日期' : '',
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={errors.budget}>
                <InputLabel id="budget-label">预算</InputLabel>
                <Select
                  labelId="budget-label"
                  id="budget"
                  value={budget}
                  label="预算"
                  onChange={(e) => setBudget(e.target.value)}
                >
                  {budgetOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                {errors.budget && <FormHelperText>请选择预算</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={errors.accommodation}>
                <InputLabel id="accommodation-label">住宿类型</InputLabel>
                <Select
                  labelId="accommodation-label"
                  id="accommodation"
                  value={accommodation}
                  label="住宿类型"
                  onChange={(e) => setAccommodation(e.target.value)}
                >
                  {accommodationOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                {errors.accommodation && <FormHelperText>请选择住宿类型</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                活动偏好
              </Typography>
              {errors.activities && (
                <FormHelperText error>请至少选择一个活动偏好</FormHelperText>
              )}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {activityOptions.map((activity) => (
                  <Chip
                    key={activity}
                    label={activity}
                    onClick={() => handleActivityToggle(activity)}
                    color={selectedActivities.includes(activity) ? 'primary' : 'default'}
                    variant={selectedActivities.includes(activity) ? 'filled' : 'outlined'}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/trips')}
                  sx={{ mr: 1 }}
                  disabled={loading}
                >
                  取消
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {loading ? '创建中...' : '创建旅行计划'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </MainLayout>
  );
};

export default CreateTripPage;
