import { useState, useEffect } from 'react';
import ModelViewer from './components/ModelViewer';
import SearchBar from './components/SearchBar';
import ModelGrid from './components/ModelGrid';
import UploadButton from './components/UploadButton';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';

function App() {
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  const fetchModels = async () => {
    try {
      const response = await fetch('/api/models');
      if (!response.ok) {
        throw new Error('Failed to fetch models');
      }
      const data = await response.json();
      setModels(data);
      setFilteredModels(data);
      if (data.length > 0 && !selectedModel) {
        setSelectedModel(data[0]);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
      // Fallback to static data if API fails
      const availableModels = [
        { id: 1, name: 'True Blue and Copper', url: '/models/True Blue and Copper.glb' },
        { id: 2, name: 'Nike Air Max 97 SE', url: '/models/Nike Air Max 97 SE(1).glb' },
        { id: 3, name: 'Air Jordan 1 Low', url: '/models/Air Jordan 1 Low.glb' },
        { id: 4, name: 'Nike Air Max 97 SE', url: '/models/Nike Air Max 97 SE.glb' },
        { id: 5, name: 'Nike Oneonta Next Nature', url: '/models/Nike Oneonta Next Nature.glb' },
        { id: 6, name: 'Jordan Hex Mule', url: '/models/Jordan Hex Mule.glb' },
        { id: 7, name: 'Nike Model 1', url: '/models/nike1.glb' },
        { id: 8, name: 'Nike Model 2', url: '/models/nike2.glb' }
      ];
      setModels(availableModels);
      setFilteredModels(availableModels);
      if (availableModels.length > 0) {
        setSelectedModel(availableModels[0]);
      }
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = models.filter(model =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredModels(filtered);
    if (filtered.length > 0 && !filtered.includes(selectedModel)) {
      setSelectedModel(filtered[0]);
    }
  };

  const handleUploadSuccess = (newModel) => {
    setModels(prevModels => [...prevModels, newModel]);
    setFilteredModels(prevModels => [...prevModels, newModel]);
    setSelectedModel(newModel);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          3D Shoe Model Viewer
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <SearchBar onSearch={handleSearch} />
          </Box>
          <UploadButton onUploadSuccess={handleUploadSuccess} />
        </Box>
        
        {selectedModel && (
          <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              {selectedModel.name}
            </Typography>
            <ModelViewer modelUrl={selectedModel.url} />
          </Paper>
        )}
        
        <Divider sx={{ my: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Available Models ({filteredModels.length})
          </Typography>
        </Divider>

        <ModelGrid 
          models={filteredModels}
          onModelSelect={setSelectedModel}
          selectedModel={selectedModel}
        />
        
        {filteredModels.length === 0 && (
          <Typography variant="body1" sx={{ mt: 2 }} align="center">
            No models found. Please try a different search term.
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default App;
