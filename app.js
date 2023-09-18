const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    fs.readFile('messages.txt', (err, data) => {
        if(err){
            console.log(err)
            data = 'No chat exists';
        }
        res.send(
            `${data} <form action="/" method="POST" onSubmit="document.getElementById('username').value = localStorage.getItem('username')">
            <input type="text" name="message" id="message">
            <input type="hidden" name="username" id="username">
            <button type="submit">Send</button>
            </form>`
        )
    })
})

app.post('/', (req, res) => {
    console.log(req.body.username);
    console.log(req.body.message);
    fs.writeFile("messages.txt", `${req.body.username}: ${req.body.message}\n`, {flag: 'a'}, (err) => {
        err ? console.log(err) : res.redirect('/')
    })
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    res.redirect('/');
});

app.get('/login', (req,res) => {
    res.send(
        `<form action="/login" method="POST" onSubmit="localStorage.setItem('username', document.getElementById('username').value)">
        <label for="username">Enter your username: </label>
        <input type="text" name="username" id="username">
        <button type="submit">Submit</button>
        </form>`
    )
})

app.listen(4000);