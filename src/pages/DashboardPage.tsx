import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import tripService, { Trip } from '../services/tripService';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await tripService.getAllTrips();
        setTrips(data);
      } catch (error) {
        console.error('Error fetching trips:', error);
        setError('无法加载您的旅行计划，请稍后再试');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Get upcoming trips (start date is in the future)
  const upcomingTrips = trips.filter(
    (trip) => new Date(trip.start_date) > new Date()
  );

  // Get recent trips (end date is in the past)
  const recentTrips = trips.filter(
    (trip) => new Date(trip.end_date) < new Date()
  );

  return (
    <MainLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          欢迎回来，{user?.username || '旅行者'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          这是您的个人旅行控制台，您可以在这里管理您的旅行计划和查看推荐。
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      ) : (
        <>
          {/* Upcoming Trips Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              即将开始的旅行
            </Typography>
            {upcomingTrips.length > 0 ? (
              <Grid container spacing={3}>
                {upcomingTrips.map((trip) => (
                  <Grid item xs={12} sm={6} md={4} key={trip.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {trip.destination}
                        </Typography>
                        <Typography color="text.secondary">
                          {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          component={RouterLink}
                          to={`/trips/${trip.id}`}
                        >
                          查看详情
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" color="text.secondary">
                您没有即将开始的旅行计划。
                <Button
                  component={RouterLink}
                  to="/trips/create"
                  sx={{ ml: 1 }}
                >
                  创建新旅行
                </Button>
              </Typography>
            )}
          </Box>

          {/* Recent Trips Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              最近的旅行
            </Typography>
            {recentTrips.length > 0 ? (
              <Grid container spacing={3}>
                {recentTrips.slice(0, 3).map((trip) => (
                  <Grid item xs={12} sm={6} md={4} key={trip.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {trip.destination}
                        </Typography>
                        <Typography color="text.secondary">
                          {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          component={RouterLink}
                          to={`/trips/${trip.id}`}
                        >
                          查看详情
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" color="text.secondary">
                您还没有完成的旅行。
              </Typography>
            )}
          </Box>

          {/* Quick Actions */}
          <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              快速操作
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/trips/create"
                >
                  创建新旅行
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to="/trips"
                >
                  查看所有旅行
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to="/profile"
                >
                  更新个人资料
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </MainLayout>
  );
};

export default DashboardPage;
