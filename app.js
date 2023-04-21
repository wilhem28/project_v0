import express, {json} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {dirname,join} from 'path';
import { fileURLToPath } from 'url';
import usersRouter from './routes/users-routes.js';
import authRouter from './routes/auth-routes.js';


dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();


const corsOptions = {credentials:true, origin:process.env.URL || '*'};

app.use(cors(corsOptions));
app.use(json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/', express.static(join(__dirname,'public')));

app.use('/api/users',usersRouter);
app.use('/api/auth',authRouter);

export default app;