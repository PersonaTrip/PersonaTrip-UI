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
  SelectChangeEvent,
  Switch,
  FormControlLabel,
  Chip,
  Slider,
  Tooltip
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  PlayArrow as TestIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import adminService, { 
  ModelConfig, 
  CreateModelConfigRequest, 
  UpdateModelConfigRequest,
  TestModelRequest
} from '../../services/adminService';

const ModelsManagement: React.FC = () => {
  const [models, setModels] = useState<ModelConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openTestDialog, setOpenTestDialog] = useState(false);
  const [currentModel, setCurrentModel] = useState<ModelConfig | null>(null);
  const [testResponse, setTestResponse] = useState('');
  const [testLoading, setTestLoading] = useState(false);
  
  // 表单状态
  const [name, setName] = useState('');
  const [modelType, setModelType] = useState('openai');
  const [modelName, setModelName] = useState('gpt-4');
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);
  const [testPrompt, setTestPrompt] = useState('');

  // 获取所有模型配置
  const fetchModels = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllModelConfigs();
      setModels(data);
      setError('');
    } catch (err: any) {
      console.error('获取模型配置列表失败:', err);
      setError(err.response?.data?.message || '获取模型配置列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  // 创建模型配置
  const handleCreateModel = async () => {
    try {
      const modelData: CreateModelConfigRequest = {
        name,
        model_type: modelType,
        model_name: modelName,
        api_key: apiKey,
        base_url: baseUrl,
        is_active: isActive,
        temperature,
        max_tokens: maxTokens
      };
      await adminService.createModelConfig(modelData);
      setOpenCreateDialog(false);
      resetForm();
      fetchModels();
    } catch (err: any) {
      console.error('创建模型配置失败:', err);
      setError(err.response?.data?.message || '创建模型配置失败');
    }
  };

  // 更新模型配置
  const handleUpdateModel = async () => {
    if (!currentModel) return;
    
    try {
      const modelData: UpdateModelConfigRequest = {
        name,
        api_key: apiKey,
        base_url: baseUrl,
        is_active: isActive,
        temperature,
        max_tokens: maxTokens
      };
      
      await adminService.updateModelConfig(currentModel.id, modelData);
      setOpenEditDialog(false);
      resetForm();
      fetchModels();
    } catch (err: any) {
      console.error('更新模型配置失败:', err);
      setError(err.response?.data?.message || '更新模型配置失败');
    }
  };

  // 删除模型配置
  const handleDeleteModel = async () => {
    if (!currentModel) return;
    
    try {
      await adminService.deleteModelConfig(currentModel.id);
      setOpenDeleteDialog(false);
      fetchModels();
    } catch (err: any) {
      console.error('删除模型配置失败:', err);
      setError(err.response?.data?.message || '删除模型配置失败');
    }
  };

  // 激活模型配置
  const handleActivateModel = async (model: ModelConfig) => {
    try {
      await adminService.activateModelConfig(model.id);
      fetchModels();
    } catch (err: any) {
      console.error('激活模型配置失败:', err);
      setError(err.response?.data?.message || '激活模型配置失败');
    }
  };

  // 测试模型配置
  const handleTestModel = async () => {
    if (!currentModel || !testPrompt) return;
    
    setTestLoading(true);
    setTestResponse('');
    
    try {
      const testData: TestModelRequest = {
        prompt: testPrompt
      };
      
      const response = await adminService.testModelConfig(currentModel.id, testData);
      setTestResponse(response.response || JSON.stringify(response));
    } catch (err: any) {
      console.error('测试模型配置失败:', err);
      setTestResponse(err.response?.data?.message || '测试模型配置失败');
    } finally {
      setTestLoading(false);
    }
  };

  // 重置表单
  const resetForm = () => {
    setName('');
    setModelType('openai');
    setModelName('gpt-4');
    setApiKey('');
    setBaseUrl('');
    setIsActive(false);
    setTemperature(0.7);
    setMaxTokens(2000);
    setTestPrompt('');
    setTestResponse('');
  };

  // 打开编辑对话框
  const openEdit = (model: ModelConfig) => {
    setCurrentModel(model);
    setName(model.name);
    setModelType(model.model_type);
    setModelName(model.model_name);
    setApiKey(model.api_key);
    setBaseUrl(model.base_url || '');
    setIsActive(model.is_active);
    setTemperature(model.temperature);
    setMaxTokens(model.max_tokens);
    setOpenEditDialog(true);
  };

  // 打开删除对话框
  const openDelete = (model: ModelConfig) => {
    setCurrentModel(model);
    setOpenDeleteDialog(true);
  };

  // 打开测试对话框
  const openTest = (model: ModelConfig) => {
    setCurrentModel(model);
    setTestPrompt('');
    setTestResponse('');
    setOpenTestDialog(true);
  };

  const handleModelTypeChange = (event: SelectChangeEvent) => {
    setModelType(event.target.value as string);
  };

  const handleModelNameChange = (event: SelectChangeEvent) => {
    setModelName(event.target.value as string);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">模型配置列表</Typography>
        <Button 
          variant="contained" 
          onClick={() => {
            resetForm();
            setOpenCreateDialog(true);
          }}
        >
          添加模型配置
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
                <TableCell>名称</TableCell>
                <TableCell>类型</TableCell>
                <TableCell>模型</TableCell>
                <TableCell>状态</TableCell>
                <TableCell>温度</TableCell>
                <TableCell>最大令牌</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {models.map((model) => (
                <TableRow key={model.id}>
                  <TableCell>{model.id}</TableCell>
                  <TableCell>{model.name}</TableCell>
                  <TableCell>{model.model_type}</TableCell>
                  <TableCell>{model.model_name}</TableCell>
                  <TableCell>
                    {model.is_active ? (
                      <Chip label="活跃" color="success" size="small" />
                    ) : (
                      <Chip label="非活跃" color="default" size="small" />
                    )}
                  </TableCell>
                  <TableCell>{model.temperature}</TableCell>
                  <TableCell>{model.max_tokens}</TableCell>
                  <TableCell>
                    <Tooltip title="编辑">
                      <IconButton onClick={() => openEdit(model)} color="primary" size="small">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="测试">
                      <IconButton onClick={() => openTest(model)} color="info" size="small">
                        <TestIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="设为活跃">
                      <IconButton 
                        onClick={() => handleActivateModel(model)} 
                        color="success" 
                        size="small"
                        disabled={model.is_active}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="删除">
                      <IconButton onClick={() => openDelete(model)} color="error" size="small">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* 创建模型配置对话框 */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>添加模型配置</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="配置名称"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="model-type-select-label">模型类型</InputLabel>
              <Select
                labelId="model-type-select-label"
                value={modelType}
                label="模型类型"
                onChange={handleModelTypeChange}
              >
                <MenuItem value="openai">OpenAI</MenuItem>
                <MenuItem value="ollama">Ollama</MenuItem>
                <MenuItem value="anthropic">Anthropic</MenuItem>
                <MenuItem value="custom">自定义</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel id="model-name-select-label">模型名称</InputLabel>
              <Select
                labelId="model-name-select-label"
                value={modelName}
                label="模型名称"
                onChange={handleModelNameChange}
              >
                {modelType === 'openai' && (
                  <>
                    <MenuItem value="gpt-4">GPT-4</MenuItem>
                    <MenuItem value="gpt-4-turbo">GPT-4 Turbo</MenuItem>
                    <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
                  </>
                )}
                {modelType === 'ollama' && (
                  <>
                    <MenuItem value="llama3">Llama 3</MenuItem>
                    <MenuItem value="mistral">Mistral</MenuItem>
                    <MenuItem value="gemma">Gemma</MenuItem>
                  </>
                )}
                {modelType === 'anthropic' && (
                  <>
                    <MenuItem value="claude-3-opus">Claude 3 Opus</MenuItem>
                    <MenuItem value="claude-3-sonnet">Claude 3 Sonnet</MenuItem>
                    <MenuItem value="claude-3-haiku">Claude 3 Haiku</MenuItem>
                  </>
                )}
                {modelType === 'custom' && (
                  <MenuItem value="custom">自定义模型</MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
          
          <TextField
            margin="dense"
            label="API密钥"
            type="password"
            fullWidth
            variant="outlined"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required={modelType !== 'ollama'}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="dense"
            label="基础URL"
            type="text"
            fullWidth
            variant="outlined"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder={modelType === 'ollama' ? 'http://localhost:11434' : ''}
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>温度 ({temperature})</Typography>
            <Slider
              value={temperature}
              onChange={(_, value) => setTemperature(value as number)}
              min={0}
              max={2}
              step={0.1}
              valueLabelDisplay="auto"
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>最大令牌数 ({maxTokens})</Typography>
            <Slider
              value={maxTokens}
              onChange={(_, value) => setMaxTokens(value as number)}
              min={100}
              max={8000}
              step={100}
              valueLabelDisplay="auto"
            />
          </Box>
          
          <FormControlLabel
            control={
              <Switch
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            }
            label="设为活跃模型"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>取消</Button>
          <Button onClick={handleCreateModel} variant="contained">创建</Button>
        </DialogActions>
      </Dialog>

      {/* 编辑模型配置对话框 */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>编辑模型配置</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="配置名称"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              margin="dense"
              label="模型类型"
              type="text"
              fullWidth
              variant="outlined"
              value={modelType}
              disabled
            />
            
            <TextField
              margin="dense"
              label="模型名称"
              type="text"
              fullWidth
              variant="outlined"
              value={modelName}
              disabled
            />
          </Box>
          
          <TextField
            margin="dense"
            label="API密钥"
            type="password"
            fullWidth
            variant="outlined"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required={modelType !== 'ollama'}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="dense"
            label="基础URL"
            type="text"
            fullWidth
            variant="outlined"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>温度 ({temperature})</Typography>
            <Slider
              value={temperature}
              onChange={(_, value) => setTemperature(value as number)}
              min={0}
              max={2}
              step={0.1}
              valueLabelDisplay="auto"
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>最大令牌数 ({maxTokens})</Typography>
            <Slider
              value={maxTokens}
              onChange={(_, value) => setMaxTokens(value as number)}
              min={100}
              max={8000}
              step={100}
              valueLabelDisplay="auto"
            />
          </Box>
          
          <FormControlLabel
            control={
              <Switch
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            }
            label="设为活跃模型"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>取消</Button>
          <Button onClick={handleUpdateModel} variant="contained">更新</Button>
        </DialogActions>
      </Dialog>

      {/* 删除模型配置确认对话框 */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <DialogContentText>
            确定要删除模型配置"{currentModel?.name}"吗？此操作不可撤销。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>取消</Button>
          <Button onClick={handleDeleteModel} color="error">删除</Button>
        </DialogActions>
      </Dialog>

      {/* 测试模型配置对话框 */}
      <Dialog open={openTestDialog} onClose={() => setOpenTestDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>测试模型配置 - {currentModel?.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="测试提示词"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={testPrompt}
            onChange={(e) => setTestPrompt(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          
          {testResponse && (
            <Paper variant="outlined" sx={{ p: 2, mt: 2, bgcolor: '#f5f5f5', maxHeight: 300, overflow: 'auto' }}>
              <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {testResponse}
              </Typography>
            </Paper>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTestDialog(false)}>关闭</Button>
          <Button 
            onClick={handleTestModel} 
            variant="contained" 
            disabled={testLoading || !testPrompt}
          >
            {testLoading ? <CircularProgress size={24} /> : '测试'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModelsManagement;
