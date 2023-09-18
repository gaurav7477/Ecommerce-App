import app from './app.js';
import dotenv from 'dotenv';
import connectDatabase from '../backend/config/database.js';

// congiguration of dotenv
dotenv.config({ path: 'backend/config/config.env' });


// Connecting to database
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});