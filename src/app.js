import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';


const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.listen(config.get('port'));

export default app;
