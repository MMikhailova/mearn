
import dotenv from 'dotenv';
import 'express-async-errors';
import express from 'express';
const app = express();
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import router from './routes/root.js';
import connectToDB from './config/dbConn.js';
import loggers from './middleware/logger.js';
import path from 'path';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js'
import authRoutes from './routes/authRoutes.js';

const {logger,logEvents}=loggers

dotenv.config();
const PORT = process.env.PORT || 3500;
connectToDB()
//custom middleware that logs all requests and its data
app.use(logger);
// cors
app.use(cors(corsOptions));
//built-in middleware
app.use(express.json());
//third-party middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//define a middleware for defining public folder
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
app.use('/', express.static(path.join(__dirname, 'public')));



// routes
app.use('/', router);
app.use('/auth',authRoutes)
app.use('/users', userRoutes);
app.use('/notes', noteRoutes);
// 404 Not Found handling
app.all('*', (req, res) => {
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 not Found' });
    } else {
        req.type('txt').send('404 Not Found');
    }
});
app.use(errorHandler);
//  attach a one-time listener for the 'open' event, which is emitted when the connection to MongoDB is successfully opened.
   
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is up and running on port: ${PORT}`)
    })
})

mongoose.connection.on('error', (err) => {
    console.log(err);
    logEvents(
        `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
        'mongoErrLog.log'
    );
});

