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
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import MainLayout from '../components/layout/MainLayout';
import tripService, { Trip } from '../services/tripService';

const TripListPage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState<string | null>(null);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const data = await tripService.getAllTrips();
      setTrips(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching trips:', error);
      setError('无法加载您的旅行计划，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDeleteClick = (tripId: string) => {
    setTripToDelete(tripId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (tripToDelete) {
      try {
        await tripService.deleteTrip(tripToDelete);
        setTrips(trips.filter(trip => trip.id !== tripToDelete));
        setDeleteDialogOpen(false);
        setTripToDelete(null);
      } catch (error) {
        console.error('Error deleting trip:', error);
        setError('删除旅行计划失败，请稍后再试');
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTripToDelete(null);
  };

  // Function to determine trip status
  const getTripStatus = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
      return { label: '即将开始', color: 'primary' };
    } else if (now >= start && now <= end) {
      return { label: '进行中', color: 'success' };
    } else {
      return { label: '已结束', color: 'default' };
    }
  };

  return (
    <MainLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          我的旅行计划
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/trips/create"
        >
          创建新旅行
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      ) : trips.length === 0 ? (
        <Box sx={{ textAlign: 'center', my: 4, p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            您还没有创建任何旅行计划
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            点击"创建新旅行"按钮开始您的旅程
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/trips/create"
            sx={{ mt: 2 }}
          >
            创建新旅行
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {trips.map((trip) => {
            const status = getTripStatus(trip.start_date, trip.end_date);
            return (
              <Grid item xs={12} sm={6} md={4} key={trip.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="h6" component="div" gutterBottom>
                        {trip.destination}
                      </Typography>
                      <Chip
                        label={status.label}
                        color={status.color as any}
                        size="small"
                      />
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {trip.preferences?.activities.join(', ') || '无活动偏好'}
                    </Typography>
                    <Typography variant="body2">
                      预算: {trip.preferences?.budget || '未设置'}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button
                      size="small"
                      component={RouterLink}
                      to={`/trips/${trip.id}`}
                    >
                      查看详情
                    </Button>
                    <Box>
                      <IconButton
                        size="small"
                        component={RouterLink}
                        to={`/trips/${trip.id}`}
                        aria-label="编辑"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(trip.id)}
                        aria-label="删除"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <DialogContentText>
            您确定要删除这个旅行计划吗？此操作无法撤销。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>取消</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};

export default TripListPage;
