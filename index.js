const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const Article = require('./db').Article;

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next) => {
    Article.all((err, articles) => {
        if (err) return next(err);
        res.format({
            html: () => {
                res.render('articles.ejs', {
                    articles: articles
                });
            },
            json: () => res.send(articles)
        });
    });

});

app.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Article.find(id, (err, article) => {
        if (err) return next(err);
        res.format({
            html: () => {
                res.render('article.ejs', {
                    article: article
                });
            },
            json: () => res.send(article)
        });
    });
});

// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//   });
  

app.listen(app.get('port'), () => console.log(`App started on port: ${app.get('port')}`));

module.exports = app;