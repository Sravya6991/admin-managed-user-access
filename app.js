const express = require('express');
const path = require('path');
const db = require('./database');
const routes = require('./routes/route')
const cors = require('cors');
const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));


app.use(cors());
app.use(routes);

db.connectToDb().then(function() {
    console.log("MongoDB is connected!!")
    app.listen(4000, (err, res) => {
        if(err) console.log("Server not connected!");
        return console.log('Server is connected')
    })
})
