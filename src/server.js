const express = require('express');
const app = express();



app.use(express.json()); //this is middlewore which allows user and server interaction

const links = {
    Anant1: 'http://localhost:3000/about/Anantshree',
    Void22: 'http://localhost:3000/about/Void'
};

console.log(links['Void22']);

app.post('/shorten', (req, res) => {
    const codeGen = Math.random().toString(36).substring(2, 8);

    console.log(codeGen);

    links[codeGen] = req.body.url;
    console.log(links[codeGen]);

    res.redirect('http://localhost:3000/' + codeGen);
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
    const thisisworking = links[req.params.code];

    if (thisisworking) {
        res.redirect(thisisworking);
    }
    else {
        res.status(404).send('Short link not found');
    }
});


app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});