import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              PersonaTrip
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AI定制旅游规划系统，让您的旅行更加个性化
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              快速链接
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block">
              首页
            </Link>
            <Link component={RouterLink} to="/trips" color="inherit" display="block">
              我的旅行
            </Link>
            <Link component={RouterLink} to="/trips/create" color="inherit" display="block">
              创建旅行
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              联系我们
            </Typography>
            <Typography variant="body2" color="text.secondary">
              邮箱: zhangsetsail@gmail.com
            </Typography>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" component={RouterLink} to="/">
              PersonaTrip
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
