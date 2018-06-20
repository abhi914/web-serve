const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

let app = express();


app.set('view engine','hbs');

hbs.registerPartials(__dirname+'/views/partials');


app.use((req,res,next) => {
    const now = new Date().toDateString()
    fs.appendFile('./logs/log.txt',`${now}: ${req.method}  ${req.url}\n`,((error) => {
        })
    );
    next();
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');

// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
});


app.get('/', (req,res) => {

    // res.send('<h1>Hello Express</h1>');
    res.render('Home.hbs',{
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to our Home'
    });
});

app.get('/about', (req,res) => {
    // res.send('About Page');
    res.render('about.hbs',{
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });

});


app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'unable to handle request'
    })
});

app.listen( port,() => {
    console.log(`Server is up on port ${port}`);
});