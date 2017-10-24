
let _articles = require("../articles.json");
const comments = exports;

comments.create = function (req, res, payload, cb) {
    if (payload) {
        let index = _articles.findIndex(article => article.id === payload.articleId);
        if (index !== -1) {
            payload.id = Date.now();
            _articles[index].comments.push(payload);
            cb(null, _articles[index].comments[_articles[index].comments.length - 1]);
           // extras.saveArticles(_articles);
        }
        else {
            cb({code: 405, message: 'Article not found'});
        }
    }
    else {
        cb({code: 405, message: 'Article not found'});
    }
};


