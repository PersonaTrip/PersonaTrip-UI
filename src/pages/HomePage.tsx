import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { APP_NAME } from '../config';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
      }}
    >
      {/* 简单导航栏 */}
      <Box
        component="nav"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 3,
          gap: 2,
        }}
      >
        <Button
          component={RouterLink}
          to="/docs"
          color="inherit"
          sx={{ fontWeight: 500 }}
        >
          文档
        </Button>
        {isAuthenticated ? (
          <Button
            component={RouterLink}
            to="/dashboard"
            color="inherit"
            sx={{ fontWeight: 500 }}
          >
            控制台
          </Button>
        ) : (
          <>
            <Button
              component={RouterLink}
              to="/login"
              color="inherit"
              sx={{ fontWeight: 500 }}
            >
              登录
            </Button>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              color="primary"
              sx={{ fontWeight: 500 }}
            >
              注册
            </Button>
          </>
        )}
      </Box>

      {/* 主要内容区 */}
      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '3rem', md: '5rem' },
            fontWeight: 700,
            letterSpacing: '-0.05em',
            mb: 4,
          }}
        >
          智能旅行规划
        </Typography>

        <Typography
          variant="body1"
          component="p"
          color="text.secondary"
          sx={{ 
            mb: 6, 
            maxWidth: '800px',
            fontSize: '1rem',
            whiteSpace: { md: 'nowrap' }
          }}
        >
          使用AI技术定制您的个性化旅行计划，让每一次旅行都独一无二
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ width: '100%', maxWidth: '400px' }}
        >
          {isAuthenticated ? (
            <Button
              component={RouterLink}
              to="/trips/create"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ py: 1.5, fontSize: '1.1rem' }}
            >
              创建旅行计划
            </Button>
          ) : (
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ py: 1.5, fontSize: '1.1rem' }}
            >
              开始使用
            </Button>
          )}
        </Stack>
      </Container>

      {/* 页脚 */}
      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
