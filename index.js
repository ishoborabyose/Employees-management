
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const bodyParser = require('body-parser')
const app = express();


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());



app.get('/', (req, req) => res.send('Server is On'));
app.use((req, res) => {
    res.status(400).send({
        status: 400,
        error: 'Bad Request',
    });
});

if(!module.parent) {
    app.listen(process.env.PORT || 3000)
}

export default app