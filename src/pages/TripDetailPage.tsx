import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Paper,
  Divider,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MainLayout from '../components/layout/MainLayout';
import tripService, { Trip, AISuggestionRequest } from '../services/tripService';

const TripDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [aiSuggestionDialogOpen, setAiSuggestionDialogOpen] = useState(false);
  const [aiSuggestionPrompt, setAiSuggestionPrompt] = useState('');
  const [aiSuggestionInterests, setAiSuggestionInterests] = useState('');
  const [aiSuggestionBudget, setAiSuggestionBudget] = useState('经济');
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [aiSuggestionLoading, setAiSuggestionLoading] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await tripService.getTripById(id);
        setTrip(data);
        setError(null);
      } catch (error) {
        console.error(`Error fetching trip with ID ${id}:`, error);
        setError('无法加载旅行计划详情，请稍后再试');
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      await tripService.deleteTrip(id);
      setDeleteDialogOpen(false);
      navigate('/trips');
    } catch (error) {
      console.error(`Error deleting trip with ID ${id}:`, error);
      setError('删除旅行计划失败，请稍后再试');
    }
  };

  const handleAiSuggestionSubmit = async () => {
    if (!id) return;
    
    try {
      setAiSuggestionLoading(true);
      const interests = aiSuggestionInterests.split(',').map(item => item.trim());
      
      const requestData: AISuggestionRequest = {
        prompt: aiSuggestionPrompt,
        preferences: {
          budget: aiSuggestionBudget,
          interests: interests,
        },
      };
      
      const suggestions = await tripService.getAISuggestions(id, requestData);
      setAiSuggestions(suggestions);
      setAiSuggestionDialogOpen(false);
    } catch (error) {
      console.error(`Error getting AI suggestions for trip with ID ${id}:`, error);
      setError('获取AI建议失败，请稍后再试');
    } finally {
      setAiSuggestionLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
        <Button variant="outlined" onClick={() => navigate('/trips')}>
          返回旅行列表
        </Button>
      </MainLayout>
    );
  }

  if (!trip) {
    return (
      <MainLayout>
        <Alert severity="warning" sx={{ my: 2 }}>
          未找到旅行计划
        </Alert>
        <Button variant="outlined" onClick={() => navigate('/trips')}>
          返回旅行列表
        </Button>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Trip Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {trip.destination}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
            </Typography>
          </Box>
          <Box>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{ mr: 1 }}
              onClick={() => navigate(`/trips/${trip.id}/edit`)}
            >
              编辑
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteDialogOpen(true)}
            >
              删除
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              旅行偏好
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" component="span" sx={{ mr: 1 }}>
                预算:
              </Typography>
              <Chip label={trip.preferences?.budget || '未设置'} size="small" />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" component="span" sx={{ mr: 1 }}>
                住宿类型:
              </Typography>
              <Chip label={trip.preferences?.accommodation_type || '未设置'} size="small" />
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>
                活动偏好:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {trip.preferences?.activities.map((activity, index) => (
                  <Chip key={index} label={activity} size="small" />
                )) || <Typography variant="body2">未设置活动偏好</Typography>}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                AI 旅行建议
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<LightbulbIcon />}
                onClick={() => setAiSuggestionDialogOpen(true)}
              >
                获取 AI 建议
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
              使用 AI 获取针对您的旅行的个性化建议，包括景点、餐厅、活动等。
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Itinerary Section */}
      {trip.itinerary && trip.itinerary.length > 0 ? (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            行程安排
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {trip.itinerary.map((day) => (
            <Accordion key={day.day} defaultExpanded={day.day === 1}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  第 {day.day} 天 ({new Date(day.date).toLocaleDateString()})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {day.activities.map((activity, index) => (
                    <ListItem key={index} alignItems="flex-start" divider={index < day.activities.length - 1}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1">{activity.description}</Typography>
                            <Typography variant="body2" color="text.secondary">{activity.time}</Typography>
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" component="span" color="text.primary">
                              地点: {activity.location}
                            </Typography>
                            {activity.notes && (
                              <Typography variant="body2" component="div" sx={{ mt: 1 }}>
                                备注: {activity.notes}
                              </Typography>
                            )}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      ) : (
        <Paper sx={{ p: 3, mb: 3, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            行程安排
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" color="text.secondary" sx={{ my: 3 }}>
            还没有行程安排，请点击"获取 AI 建议"按钮生成行程
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<LightbulbIcon />}
            onClick={() => setAiSuggestionDialogOpen(true)}
          >
            获取 AI 建议
          </Button>
        </Paper>
      )}

      {/* AI Suggestions Section */}
      {aiSuggestions && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            AI 建议
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {aiSuggestions.suggestions.dining && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                餐饮建议
              </Typography>
              <Grid container spacing={2}>
                {aiSuggestions.suggestions.dining.map((item: any, index: number) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {item.location} | {item.price_range}
                        </Typography>
                        <Typography variant="body2">
                          {item.description}
                        </Typography>
                        {item.recommended_dishes && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2">
                              推荐菜品: {item.recommended_dishes.join(', ')}
                            </Typography>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {aiSuggestions.suggestions.cultural_experiences && (
            <Box>
              <Typography variant="h6" gutterBottom>
                文化体验
              </Typography>
              <Grid container spacing={2}>
                {aiSuggestions.suggestions.cultural_experiences.map((item: any, index: number) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {item.location} | {item.duration} | {item.price}
                        </Typography>
                        <Typography variant="body2">
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Paper>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <DialogContentText>
            您确定要删除这个旅行计划吗？此操作无法撤销。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            删除
          </Button>
        </DialogActions>
      </Dialog>

      {/* AI Suggestion Dialog */}
      <Dialog
        open={aiSuggestionDialogOpen}
        onClose={() => setAiSuggestionDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>获取 AI 旅行建议</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            请输入您的需求和偏好，AI 将为您生成个性化的旅行建议。
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="prompt"
            label="您的需求"
            placeholder="例如：我想要更多关于当地美食的建议"
            fullWidth
            variant="outlined"
            value={aiSuggestionPrompt}
            onChange={(e) => setAiSuggestionPrompt(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="interests"
            label="兴趣爱好"
            placeholder="例如：美食,文化体验,历史景点"
            helperText="多个兴趣请用逗号分隔"
            fullWidth
            variant="outlined"
            value={aiSuggestionInterests}
            onChange={(e) => setAiSuggestionInterests(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            margin="dense"
            id="budget"
            label="预算"
            fullWidth
            variant="outlined"
            value={aiSuggestionBudget}
            onChange={(e) => setAiSuggestionBudget(e.target.value)}
            SelectProps={{
              native: true,
            }}
          >
            <option value="经济">经济</option>
            <option value="中等">中等</option>
            <option value="高端">高端</option>
            <option value="奢华">奢华</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAiSuggestionDialogOpen(false)}>取消</Button>
          <Button 
            onClick={handleAiSuggestionSubmit} 
            variant="contained"
            disabled={aiSuggestionLoading || !aiSuggestionPrompt}
          >
            {aiSuggestionLoading ? '生成中...' : '获取建议'}
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};

export default TripDetailPage;
