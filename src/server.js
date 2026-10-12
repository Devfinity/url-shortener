const express = require('express');

const app = express();

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

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});