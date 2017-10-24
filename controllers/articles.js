const fs = require('fs');

let _articles = require('../articles.json');
module.exports = {
    readAll,
    read
};

function readAll(req, res, payload, cb) {
    cb(null, _articles);
}

function read(req, res, payload, cb) {
    if (payload) {
        cb(null, _articles[_articles.findIndex(article => article.id === payload.id)]);
    }
    else {
        cb(null, null);
    }
}
