let _articles = require("../articles.json");
let validatorController =  require('./controllers/validator');
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
        cb({code: 405, message: 'Article not found'});
    }
};

function deleteC(req, res, payload, cb) {
    if (validatorController.isIdArticle(payload) && validatorController.isCommentId(payload)) {
        let Cindex = _articles[_articles.findIndex(article => article.id === payload.articleid)].Comments.findIndex(comment => comment.id === payload.id);
        _articles[_articles.findIndex(article => article.id === payload.articleid)].Comments.splice(Cindex, 1);
        fs.writeFile("articles.json", JSON.stringify(_articles), "utf8", function () { });
        cb(null, "SUCCESS DELETE COMMENT");
    }
    else {
        cb(null, null);
    }
}

