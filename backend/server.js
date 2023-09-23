import app from './app.js';
import dotenv from 'dotenv';
import connectDatabase from '../backend/config/database.js';


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


// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
// console.log(hello); // this will throw uncaught error

// unhandled promise rejection
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    });
});





