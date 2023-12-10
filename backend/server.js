import app from './app.js';
import dotenv from 'dotenv';
import connectDatabase from '../backend/config/database.js';
import cloudinary from 'cloudinary';

// uncaught exception
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down due to uncaught exception`);
    server.close(() => {
        process.exit(1);
    });
});
// congiguration of dotenv
dotenv.config({ path: 'backend/config/config.env' });

if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({ path: "backend/config/config.env" });
  }

// Connecting to database
connectDatabase();

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
// console.log(hello); // this will throw uncaught error

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});





