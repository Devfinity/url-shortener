const express = require('express');
const db = require('./database.js');
const app = express();

app.use(express.static('public')); //uses the directory public which i created
app.use(express.json()); //this is middlewore which allows user and server interaction

const links = {
    Anant1: 'http://localhost:3000/about/Anantshree',
    Void22: 'http://localhost:3000/about/Void'
};

app.post('/shorten', (req, res) => {
    if (!req.body.url) { //returns a error when field is empty
        return res.status(400).json({ //json sends this to the script.js
            message: 'Please provide a URL.'
        });
    }

    try {
        new URL(req.body.url) //valdating the url ourself

    }
    catch {
        return res.status(400).json({
            message: 'Please provide a valid URL.'
        });
    }

    const codeGen = Math.random().toString(36).substring(2, 8);

    console.log(codeGen);

    db.prepare('INSERT INTO urls(code, original_url) VALUES(?, ?)').run(codeGen, req.body.url); //puts js value into the 
    //database to store code and url

    const backtofront = {
        "shortUrl": 'http://localhost:3000/' + codeGen //new url
    }

    res.json(backtofront);
});

app.get('/', (req, res) => {
    console.log(req.method, req.url);
    res.send('Welcome');
});


app.get('/project', (req, res) => {
    console.log(req.method, req.url);
    res.send('I am building a URL shortener!');
});

app.get('/about/:name', (req, res) => {
    console.log(req.method, req.url);
    res.send(`${req.params.name} is learning backend development!`);
});

app.get('/:code', (req, res) => {
    const thisisworking = db.prepare('SELECT original_url FROM urls WHERE code = ?').get(req.params.code); //retrives the url from the database

    if (thisisworking) {
        res.redirect(thisisworking.original_url);
    }
    else {
        res.status(404).send('Short link not found');
    }
});


app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});