const fs = require('fs');
let _articles = require('../articles.json');
let validatorController =  require('./validator');

let seed = 0;

module.exports = {
    readAll,
    read,
    create,
    update,
    deleteArt
};

function readAll(req, res, payload, cb) {
    cb(null, _articles);
}

function read(req, res, payload, cb) {
 if(validatorController.isIdArticle(payload)) {
        cb(null, _articles[_articles.findIndex(article => article.id === payload.id)]);
    }
    else {
        cb(null, null);
    }
}

function create(req, res, payload, cb) {
    if (validatorController.isArticle(payload)) 
    {
        payload.id = Date.now() + ++seed;
        payload.comments = [];
        _articles.push(payload);
        fs.writeFile("articles.json", JSON.stringify(_articles), "utf8", function () { });
        cb(null, payload);
    }
    else {
        cb(null, null);
    }
}


function update(req, res, payload, cb) {
    if (validatorController.isIdArticle(payload)) {
        if (validatorController.isArticle(payload)) {
            _articles[_articles.findIndex(article => article.id === payload.id)].author = payload.author;
            _articles[_articles.findIndex(article => article.id === payload.id)].id = payload.id;
            _articles[_articles.findIndex(article => article.id === payload.id)].date = payload.date;
            _articles[_articles.findIndex(article => article.id === payload.id)].text = payload.text;
            _articles[_articles.findIndex(article => article.id === payload.id)].title = payload.title;
            fs.writeFile("articles.json", JSON.stringify(_articles), "utf8", function () { });
            cb(null, "UPDATE SUCCESS");
        }
        else {
            cb(null, null);
        }
    }
    else {
        cb(null, null);
    }
}

function deleteArt(req, res, payload, cb) {
    if (validatorController.isIdArticle(payload)) {
        _articles.splice(_articles.findIndex(article => article.id === payload.id), 1);
        fs.writeFile("articles.json", JSON.stringify(_articles), "utf8", function () { });
        cb(null, "SUCCESS DELETE ARTICLE");
    }
    else {
        cb(null, null);
    }
}