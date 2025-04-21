import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Button,
  AppBar,
  Toolbar,
  Paper
} from '@mui/material';
import AdminsManagement from '../../components/admin/AdminsManagement';
import ModelsManagement from '../../components/admin/ModelsManagement';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [adminData, setAdminData] = useState<any>(null);

  useEffect(() => {
    // 检查管理员是否已登录
    const adminToken = localStorage.getItem('adminToken');
    const storedAdminData = localStorage.getItem('adminData');
    
    if (!adminToken || !storedAdminData) {
      navigate('/admin/login');
      return;
    }
    
    try {
      setAdminData(JSON.parse(storedAdminData));
    } catch (error) {
      console.error('无法解析管理员数据:', error);
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  if (!adminData) {
    return null; // 加载中或未登录
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PersonaTrip 管理系统
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {adminData.username} ({adminData.role})
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              退出登录
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ mb: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin tabs">
              <Tab label="管理员管理" {...a11yProps(0)} />
              <Tab label="模型配置" {...a11yProps(1)} />
              <Tab label="系统概览" {...a11yProps(2)} />
            </Tabs>
          </Box>
          
          <TabPanel value={tabValue} index={0}>
            <AdminsManagement />
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <ModelsManagement />
          </TabPanel>
          
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom>
              系统概览
            </Typography>
            <Typography paragraph>
              这里将显示系统的概览信息，如用户数量、旅行计划数量、系统状态等。
            </Typography>
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminDashboardPage;
