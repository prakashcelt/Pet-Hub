import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import { testConnection } from './database.js';
import authRoutes from './routes/authRoutes.js';
import externalRoutes from './routes/externalRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(express.json());    

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/external', externalRoutes);
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Pet Hub API!');
});


// Start the server
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
    // Test database connection
    await testConnection();
});