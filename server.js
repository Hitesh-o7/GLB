import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/models/');
  },
  filename: function (req, file, cb) {
    // Keep original filename but ensure it's unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, path.parse(file.originalname).name + '-' + uniqueSuffix + '.glb');
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'model/gltf-binary' || path.extname(file.originalname).toLowerCase() === '.glb') {
      cb(null, true);
    } else {
      cb(new Error('Only GLB files are allowed!'));
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

// Serve static files from the public directory
app.use(express.static('public'));

// Get all models
app.get('/api/models', (req, res) => {
  const modelsDir = path.join(__dirname, 'public/models');
  
  try {
    const files = fs.readdirSync(modelsDir);
    const models = files
      .filter(file => file.toLowerCase().endsWith('.glb'))
      .map((file, index) => ({
        id: index + 1,
        name: path.parse(file).name,
        url: `/models/${file}`
      }));
    
    res.json(models);
  } catch (error) {
    console.error('Error reading models directory:', error);
    res.status(500).json({ error: 'Failed to read models' });
  }
});

// Upload new model
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const newModel = {
      id: Date.now(), // Use timestamp as ID
      name: path.parse(req.file.originalname).name,
      url: `/models/${req.file.filename}`
    };

    res.json(newModel);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 