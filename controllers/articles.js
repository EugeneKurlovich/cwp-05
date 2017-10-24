const fs = require('fs');
let _articles = require('../articles.json');

let seed = 0;

module.exports = {
    readAll,
    read,
    create
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

function create(req, res, payload, cb) {
    if (payload) 
    {
        payload.id = Date.now() + ++seed;
        payload.Comments = [];
        _articles.push(payload);
        fs.writeFile("articles.json", JSON.stringify(_articles), "utf8", function () { });
        cb(null, payload);
    }
    else {
        cb(null, null);
    }
}
