const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const read = require('node-readability');
const Article = require('./db').Article;

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/articles', (req, res, next) => {
    Article.all((err, articles) => {
        if (err) return next(err);
        res.send(articles);
    });

});

app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    Article.find(id, (err, article) => {
        if (err) return next(err);
        res.send(article);
    });
});

app.post('/articles', (req, res, next) => {
    const url = req.body.url;
    read(url, (err, result) => {
        if (err || !result) res.status(500).send('Error download article');
        Article.create({
            title: result.title,
            content: result.content
        }, (err, article) => {
            if (err) return next(err);
            res.send('Ok');
        });
    });
});

app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    Article.delete(id, (err) => {
        if (err) return next(err);
        res.send({
            message: 'Deleted.'
        });
    });
});

app.listen(app.get('port'), () => console.log(`App started on port: ${app.get('port')}`));

module.exports = app;