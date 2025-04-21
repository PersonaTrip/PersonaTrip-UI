import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import adminService, { Admin, CreateAdminRequest, UpdateAdminRequest } from '../../services/adminService';

const AdminsManagement: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  
  // 表单状态
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');

  // 获取所有管理员
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllAdmins();
      setAdmins(data);
      setError('');
    } catch (err: any) {
      console.error('获取管理员列表失败:', err);
      setError(err.response?.data?.message || '获取管理员列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // 创建管理员
  const handleCreateAdmin = async () => {
    try {
      const adminData: CreateAdminRequest = {
        username,
        password,
        email,
        role
      };
      await adminService.createAdmin(adminData);
      setOpenCreateDialog(false);
      resetForm();
      fetchAdmins();
    } catch (err: any) {
      console.error('创建管理员失败:', err);
      setError(err.response?.data?.message || '创建管理员失败');
    }
  };

  // 更新管理员
  const handleUpdateAdmin = async () => {
    if (!currentAdmin) return;
    
    try {
      const adminData: UpdateAdminRequest = {};
      if (password) adminData.password = password;
      if (email) adminData.email = email;
      if (role) adminData.role = role;
      
      await adminService.updateAdmin(currentAdmin.id, adminData);
      setOpenEditDialog(false);
      resetForm();
      fetchAdmins();
    } catch (err: any) {
      console.error('更新管理员失败:', err);
      setError(err.response?.data?.message || '更新管理员失败');
    }
  };

  // 删除管理员
  const handleDeleteAdmin = async () => {
    if (!currentAdmin) return;
    
    try {
      await adminService.deleteAdmin(currentAdmin.id);
      setOpenDeleteDialog(false);
      fetchAdmins();
    } catch (err: any) {
      console.error('删除管理员失败:', err);
      setError(err.response?.data?.message || '删除管理员失败');
    }
  };

  // 重置表单
  const resetForm = () => {
    setUsername('');
    setPassword('');
    setEmail('');
    setRole('admin');
  };

  // 打开编辑对话框
  const openEdit = (admin: Admin) => {
    setCurrentAdmin(admin);
    setEmail(admin.email);
    setRole(admin.role);
    setPassword(''); // 不回显密码
    setOpenEditDialog(true);
  };

  // 打开删除对话框
  const openDelete = (admin: Admin) => {
    setCurrentAdmin(admin);
    setOpenDeleteDialog(true);
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">管理员列表</Typography>
        <Button 
          variant="contained" 
          onClick={() => {
            resetForm();
            setOpenCreateDialog(true);
          }}
        >
          添加管理员
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>用户名</TableCell>
                <TableCell>邮箱</TableCell>
                <TableCell>角色</TableCell>
                <TableCell>创建时间</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>{admin.id}</TableCell>
                  <TableCell>{admin.username}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell>{new Date(admin.created_at).toLocaleString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => openEdit(admin)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => openDelete(admin)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* 创建管理员对话框 */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>添加管理员</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="用户名"
            type="text"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="密码"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="邮箱"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="role-select-label">角色</InputLabel>
            <Select
              labelId="role-select-label"
              value={role}
              label="角色"
              onChange={handleRoleChange}
            >
              <MenuItem value="admin">管理员</MenuItem>
              <MenuItem value="super_admin">超级管理员</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>取消</Button>
          <Button onClick={handleCreateAdmin} variant="contained">创建</Button>
        </DialogActions>
      </Dialog>

      {/* 编辑管理员对话框 */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>编辑管理员</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="用户名"
            type="text"
            fullWidth
            variant="outlined"
            value={currentAdmin?.username || ''}
            disabled
          />
          <TextField
            margin="dense"
            label="新密码（留空表示不修改）"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="邮箱"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="edit-role-select-label">角色</InputLabel>
            <Select
              labelId="edit-role-select-label"
              value={role}
              label="角色"
              onChange={handleRoleChange}
            >
              <MenuItem value="admin">管理员</MenuItem>
              <MenuItem value="super_admin">超级管理员</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>取消</Button>
          <Button onClick={handleUpdateAdmin} variant="contained">更新</Button>
        </DialogActions>
      </Dialog>

      {/* 删除管理员确认对话框 */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <DialogContentText>
            确定要删除管理员"{currentAdmin?.username}"吗？此操作不可撤销。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>取消</Button>
          <Button onClick={handleDeleteAdmin} color="error">删除</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminsManagement;
