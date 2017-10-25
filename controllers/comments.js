let _articles = require("../articles.json");
let validatorController =  require('./validator');
const comments = exports;

comments.create = function (req, res, payload, cb) {
    if (validatorController.isIdArticle(payload)) {
        let index = _articles.findIndex(article => article.id === payload.articleId);
        if (index !== -1) {
            payload.id = Date.now();
            _articles[index].comments.push(payload);
            cb(null, _articles[index].comments[_articles[index].comments.length - 1]);
        }
        else {
            cb({code: 405, message: 'Article not found'});
        }
    }
    else {
        cb({code: 405, message: 'Articlee not found'});
    }
};

comments.deleteCom = function(req, res, payload, cb) {
     let index = _articles.findIndex(article => article.id === payload.articleId);

    if (index !== -1) {
        index = _articles[index].comments.findIndex(comment => comment.id === payload.id);
        if (index !== -1) {
            _articles[index].comments.splice(index, 1);
            cb(null, _articles);
        
        }
        else {
            cb({code: 406, message: 'Comment not found'});
        }
    }
    else {
        cb({code: 405, message: 'Article not found'});
    }
}

