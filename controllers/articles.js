const fs = require('fs');

let _articles = require('../articles.json');
module.exports = {
    readAll
};

function readAll(req, res, payload, cb) {
    cb(null, _articles);
}