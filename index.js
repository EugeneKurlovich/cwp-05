const http = require('http');
const fs = require('fs');
const articlesControllers = require('./controllers/articles');
const commentsController = require('./controllers/comments');

let LogPath = "./Logs/Log.txt";

const hostname = '127.0.0.1';
const port = 3000;
let File;

const handlers = {
    '/api/articles/readAll': articlesControllers.readAll,
    '/api/articles/read': articlesControllers.read,
    '/api/articles/create': articlesControllers.create,
    '/api/articles/update': articlesControllers.update,
    '/api/articles/delete': articlesControllers.deleteArt,
    '/api/comments/create': commentsController.create,
    '/api/comments/deleteCom': commentsController.deleteCom
};

function Log(data) {
    let date = new Date();
    fs.write(File, date.toLocaleString() + ": \r\n" + data + '\r\n', function (err) {
        if (err) {
        }
    });
}

fs.open(LogPath, 'w', function (err, fd) {
    File = fd;
});

const server = http.createServer((req, res) => {
    parseBodyJson(req, (err, payload) => {
        const handler = getHandler(req.url);
        handler(req, res, payload, (err, result) => {
            if (err) {
                res.statusCode = err.code;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(err));
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        });
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function getHandler(url) {
    return handlers[url] || notFound;
}

function sum(req, res, payload, cb) {
    const result = { c: payload.a + payload.b };

    cb(null, result);
}

function notFound(req, res, payload, cb) {
    cb({ code: 404, message: 'Not found' });
}

function parseBodyJson(req, cb) {
    let body = [];
    req.on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        body = Buffer.concat(body).toString();
        Log(req.url + '\r\n' + body);
        console.log("body : " + body);
        if (body !== "") {
            params = JSON.parse(body);
            cb(null, params);
        }
        else {
            cb(null, null);
        }
    });
}