const express = require('express');
const app = express();
const path = require('path');
const fsPromises = require('fs').promises;
const data = require('./data.json');
const errorHandler = require('./middleware/errorHandler.js');
const cors = require('cors');

app.use(cors());

// build-in middleware, url encoded data;
app.use(express.urlencoded({ extended : false}))

// convert all third-data in json format about readabling
app.use(express.json());

// static middleware function
// app.set('view engine','ejs');
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'))
app.use(errorHandler)
app.get('/',(req, res) =>{
    res.send('hello')
})


app.listen(3200, (err, res) => {
    console.log('Listening to port 3200');
})


