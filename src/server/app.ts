import express from 'express';
import {bind} from './routes'

const app = express();
const port = 3001;
app.use(express.json())
bind(app)
app.listen(port)

