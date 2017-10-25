let _articles = require('../articles.json');

function isIdArticle(payload) {
    if (_articles.findIndex(article => article.id === payload.id) !== -1) {
        return true;
    }
    return false;
}

function isArticle(payload) {
    return (payload.title !== undefined && payload.text !== undefined && payload.date !== undefined && payload.author !== undefined)
}

function isCommentId(payload) {
    return (payload.id !== undefined && payload.articleid !== undefined)
}

module.exports = {
    isIdArticle,
    isArticle,
    isCommentId
};