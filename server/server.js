const path = require('path');
const express = require('express')
const app = express();
const fs = require('fs');
const port = process.env.PORT || 5000;
const publicPath = path.join(__dirname,'../puplic');


app.use(express.static(publicPath));
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to save log');
        }
    })

    next();
});

app.get('/', (req, res) => {
    res.render('index.html');
});



app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(`Example app listening on port ${port}!`)
    }
})