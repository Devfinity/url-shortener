const express = require('express');
const db = require('./database.js');
const app = express();

app.use(express.static('public')); //uses the directory public which i created
app.use(express.json()); //this is middlewore which allows user and server interaction

let codeGen;

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
        const parasedUrl = new URL(req.body.url) //valdating the url ourself

        if (parasedUrl.protocol != 'https:' && parasedUrl.protocol != 'http:') {
            return res.status(400).json({
                message: 'Please use url with http: and https: protocol!'
            });
        }

        if (parasedUrl.hostname == 'localhost' && parasedUrl.port == '3000') {
            return res.status(400).json({
                message: 'You cannot shorten a URL that points to this application.'
            });
        }

    }
    catch {
        return res.status(400).json({
            message: 'Please provide a valid URL.'
        });
    }

    let inserted = false;

    while (!inserted) {
        try {
            codeGen = Math.random().toString(36).substring(2, 8);


            db.prepare('INSERT INTO urls(code, original_url) VALUES(?, ?)').run(codeGen, req.body.url); //puts js value into the
            //database to store code and ur
            inserted = true;
        }
        catch (error) {
            if (error.code == 'SQLITE_CONSTRAINT_PRIMARYKEY') {
                inserted = false;
            }
            else {
                return; //we will work on it
            }
        }
    }

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
        //counts the number of times someone has clicked the shortened link and saves to database
        //doesn't count unique!!
        db.prepare('UPDATE urls SET clicks = clicks + 1 WHERE code = ?').run(req.params.code);
        res.redirect(thisisworking.original_url);
    }
    else {
        res.status(404).send('Short link not found');
    }
});


app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});