const express = require('express');
const app  = express();
const db = require('./db');

const cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

app.use(cors());

const userRotes = require('./Routes/userRoutes');
app.use('/',userRotes);



app.listen(2001,()=>{
    console.log('Server Listening');
})