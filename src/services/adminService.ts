import axios from 'axios';
import { API_BASE_URL } from '../config';

// 管理员类型
export interface Admin {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
  updated_at?: string;
}

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  token: string;
  admin: Admin;
}

export interface CreateAdminRequest {
  username: string;
  password: string;
  email: string;
  role: string;
}

export interface UpdateAdminRequest {
  email?: string;
  password?: string;
  role?: string;
}

// 模型配置类型
export interface ModelConfig {
  id: number;
  name: string;
  model_type: string;
  model_name: string;
  api_key: string;
  base_url: string;
  is_active: boolean;
  temperature: number;
  max_tokens: number;
  created_at: string;
  updated_at?: string;
}

export interface CreateModelConfigRequest {
  name: string;
  model_type: string;
  model_name: string;
  api_key: string;
  base_url: string;
  is_active: boolean;
  temperature: number;
  max_tokens: number;
}

export interface UpdateModelConfigRequest {
  name?: string;
  api_key?: string;
  base_url?: string;
  is_active?: boolean;
  temperature?: number;
  max_tokens?: number;
}

export interface TestModelRequest {
  prompt: string;
}

// 管理员服务
const adminService = {
  // 管理员登录
  login: async (credentials: AdminLoginRequest): Promise<AdminLoginResponse> => {
    try {
      console.log('发送登录请求到:', `${API_BASE_URL}/api/admin/login`);
      console.log('请求数据:', credentials);
      
      // 设置请求配置
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10秒超时
      };
      
      const response = await axios.post(`${API_BASE_URL}/api/admin/login`, credentials, config);
      console.log('登录响应:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('管理员登录错误:', error);
      console.error('错误详情:', {
        message: error.message,
        response: error.response,
        request: error.request,
      });
      throw error;
    }
  },

  // 创建管理员
  createAdmin: async (adminData: CreateAdminRequest): Promise<Admin> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/admins`, adminData);
      return response.data;
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  },

  // 获取所有管理员
  getAllAdmins: async (): Promise<Admin[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/admins`);
      return response.data;
    } catch (error) {
      console.error('Error fetching admins:', error);
      throw error;
    }
  },

  // 获取管理员详情
  getAdminById: async (id: number): Promise<Admin> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/admins/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching admin with ID ${id}:`, error);
      throw error;
    }
  },

  // 更新管理员
  updateAdmin: async (id: number, adminData: UpdateAdminRequest): Promise<Admin> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/admin/admins/${id}`, adminData);
      return response.data;
    } catch (error) {
      console.error(`Error updating admin with ID ${id}:`, error);
      throw error;
    }
  },

  // 删除管理员
  deleteAdmin: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/admins/${id}`);
    } catch (error) {
      console.error(`Error deleting admin with ID ${id}:`, error);
      throw error;
    }
  },

  // 创建模型配置
  createModelConfig: async (configData: CreateModelConfigRequest): Promise<ModelConfig> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/models`, configData);
      return response.data;
    } catch (error) {
      console.error('Error creating model config:', error);
      throw error;
    }
  },

  // 获取所有模型配置
  getAllModelConfigs: async (): Promise<ModelConfig[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/models`);
      return response.data;
    } catch (error) {
      console.error('Error fetching model configs:', error);
      throw error;
    }
  },

  // 获取活跃的模型配置
  getActiveModelConfig: async (): Promise<ModelConfig> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/models/active`);
      return response.data;
    } catch (error) {
      console.error('Error fetching active model config:', error);
      throw error;
    }
  },

  // 获取模型配置详情
  getModelConfigById: async (id: number): Promise<ModelConfig> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/models/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching model config with ID ${id}:`, error);
      throw error;
    }
  },

  // 更新模型配置
  updateModelConfig: async (id: number, configData: UpdateModelConfigRequest): Promise<ModelConfig> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/admin/models/${id}`, configData);
      return response.data;
    } catch (error) {
      console.error(`Error updating model config with ID ${id}:`, error);
      throw error;
    }
  },

  // 删除模型配置
  deleteModelConfig: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/models/${id}`);
    } catch (error) {
      console.error(`Error deleting model config with ID ${id}:`, error);
      throw error;
    }
  },

  // 设置活跃模型配置
  activateModelConfig: async (id: number): Promise<void> => {
    try {
      await axios.post(`${API_BASE_URL}/api/admin/models/${id}/activate`);
    } catch (error) {
      console.error(`Error activating model config with ID ${id}:`, error);
      throw error;
    }
  },

  // 测试模型配置
  testModelConfig: async (id: number, testData: TestModelRequest): Promise<any> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/models/${id}/test`, testData);
      return response.data;
    } catch (error) {
      console.error(`Error testing model config with ID ${id}:`, error);
      throw error;
    }
  },
};

export default adminService;
