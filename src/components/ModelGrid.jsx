import { Grid, Card, CardContent, CardMedia, Typography, Box, Skeleton } from '@mui/material';
import { Stage, PresentationControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import Model from './Model';

const ModelPreview = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box sx={{ height: 200, position: 'relative' }}>
      {isLoading && (
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%" 
          animation="wave"
          sx={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <PresentationControls
              speed={1.5}
              global
              zoom={0.7}
              rotation={[0, -Math.PI / 4, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
              <Model url={url} onLoad={() => setIsLoading(false)} />
            </PresentationControls>
          </Stage>
        </Suspense>
      </Canvas>
    </Box>
  );
};

const ModelGrid = ({ models, onModelSelect, selectedModel }) => {
  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {models.map((model) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={model.id}>
          <Card 
            onClick={() => onModelSelect(model)}
            sx={{
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transform: selectedModel?.id === model.id ? 'scale(1.02)' : 'scale(1)',
              boxShadow: selectedModel?.id === model.id ? 6 : 1,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 6,
              },
              bgcolor: selectedModel?.id === model.id ? 'action.selected' : 'background.paper',
            }}
          >
            <ModelPreview url={model.url} />
            <CardContent>
              <Typography variant="h6" component="div" noWrap>
                {model.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ModelGrid; 