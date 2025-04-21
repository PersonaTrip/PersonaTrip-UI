import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import MainLayout from '../components/layout/MainLayout';

const NotFoundPage: React.FC = () => {
  return (
    <MainLayout>
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            textAlign: 'center',
          }}
        >
          <Typography variant="h1" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            页面未找到
          </Typography>
          <Typography variant="body1" paragraph>
            您访问的页面不存在或已被移除。
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/"
            size="large"
            sx={{ mt: 2 }}
          >
            返回首页
          </Button>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default NotFoundPage;
