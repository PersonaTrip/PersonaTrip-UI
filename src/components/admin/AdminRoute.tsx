import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // 检查管理员是否已登录
    const adminToken = localStorage.getItem('adminToken');
    setIsAuthenticated(!!adminToken);
  }, []);

  // 加载状态
  if (isAuthenticated === null) {
    return null; // 或者显示加载指示器
  }

  // 如果未认证，重定向到管理员登录页面
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // 如果已认证，渲染子路由
  return <Outlet />;
};

export default AdminRoute;
