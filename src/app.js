import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import apiRouter from './api';

require('./passport');

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.listen(config.get('port'));

export default app;
