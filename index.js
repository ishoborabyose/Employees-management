
import express from 'express';
import dotenv from 'dotenv';
import managerRoute from './routes/manager';

dotenv.config();
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use('/api/manager', managerRoute );


app.get('/', (req, res) => res.send('Server is On'));
app.use((req, res) => {
    res.status(400).send({
        status: 400,
        error: 'Bad Request',
    });
});

if(!module.parent) {
    app.listen(port, () => console.log(`listening to port ${port}`));
}

export default app;