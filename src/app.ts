import express from 'express';
import bodyParser from 'body-parser';
import serverConection from './server';
import userRoutes from './routes/userRoutes';
import contentRoutes from './routes/contentRoutes';
import { errorHandler } from './middleware/ErrorHandler';
import topicRoutes from './routes/topicRoutes';
import cors from 'cors'


const app = express();


app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors())

app.use('/users', userRoutes);
app.use('/contents', contentRoutes);
app.use('/topics', topicRoutes);

app.use(errorHandler);


serverConection(app)