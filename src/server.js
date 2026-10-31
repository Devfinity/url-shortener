const express = require('express');
const db = require('./database.js');
const crypto = require('crypto');
const app = express();

app.use(express.static('public')); //uses the directory public which i created
app.use(express.json()); //this is middlewore which allows user and server interaction

const CODE_REGEX = /^[a-z0-9]{6}$/;
const APP_ORIGIN = 'http://localhost:3000';
let gen = "abcdefghijklmnopqrstuvwxyz0123456789";

const links = {};

app.post('/shorten', (req, res) => {
    if (!req.body.url || !req.body.url.trim()) { //returns a error when field is empty
        return res.status(400).json({ //json sends this to the script.js
            message: 'Please provide a URL.'
        });
    }

    try {
        const parasedUrl = new URL(req.body.url) //valdating the url ourself

        if (parasedUrl.protocol !== 'https:' && parasedUrl.protocol !== 'http:') {
            return res.status(400).json({
                message: 'Please use url with http: and https: protocol!'
            });
        }

        if (parasedUrl.origin === APP_ORIGIN) {
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
    let codeGen = "";
    let maxAttempt = 0;
    let inserted = false;

    while (!inserted && maxAttempt < 10) {
        codeGen = "";

        try {
            for (let i = 0; i < 6; i++) {
                const generating = crypto.randomInt(gen.length);
                codeGen += gen[generating];
            }


            db.prepare('INSERT INTO urls(code, original_url, created_at) VALUES(?, ?, CURRENT_TIMESTAMP)').run(codeGen, req.body.url); //puts js value into the
            //database to store code and ur
            inserted = true;
        }
        catch (error) {
            if (error.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
                inserted = false;
                maxAttempt++;
            }
            else {
                return res.status(500).json({
                    message: 'Something went wrong'
                });
            }
        }
    }

    if (!inserted) {
        return res.status(500).json({
            message: 'Failed to generate a unique code, Please try again!'
        });
    }

    const backtofront = {
        "shortUrl": `${APP_ORIGIN}/${codeGen}` //new url
    }

    res.json(backtofront);
});

app.get('/stats/:code', (req, res) => {
    if (!CODE_REGEX.test(req.params.code)) {
        return res.status(400).json({
            message: 'Invalid code, please enter a valid code!'
        });
    }

    try {
        const stats = db.prepare('SELECT code, original_url, clicks, created_at FROM urls WHERE code = ?').get(req.params.code); //retrives values
        //it is working like a struct if we compare it to c++

        if (stats === undefined) {
            return res.status(404).json({
                message: 'Code not found, please enter a valid code!'
            });
        }
        else {
            res.json(stats);
        }
    }
    catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while accessing the database'
        });
    }
});

app.get('/:code', (req, res) => {
    if (!CODE_REGEX.test(req.params.code)) {
        return res.status(400).json({
            message: 'Invalid code, please enter a valid code!'
        });
    }

    try {
        const thisisworking = db.prepare('SELECT original_url FROM urls WHERE code = ?').get(req.params.code);
        //retrives the url from the database

        if (thisisworking) {
            try {
                //counts the number of times someone has clicked the shortened link and saves to database
                //doesn't count unique!!
                db.prepare('UPDATE urls SET clicks = clicks + 1 WHERE code = ?').run(req.params.code);
            }
            catch (error) {
                console.error(error);
            }

            res.redirect(thisisworking.original_url);
        }
        else {
            res.status(404).send('Short link not found');
        }
    }
    catch (error) {
        return res.status(500).json({
            message: 'Something  went wrong while accessing the database!'
        });
    }
});


app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});