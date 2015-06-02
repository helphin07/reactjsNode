var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

//For requiring `.jsx` files as Node modules
require('node-jsx').install({extension: '.jsx'});
var React = require('react');
var App = require('./app/App.jsx');

var app = express();

var wynk_api = 'http://hooq-staging-env.elasticbeanstalk.com/v0.11/feeds/';
var feed_path = 'SONYLIV/programs?pageSize=15';
var detail_path = 'SONYLIV/program/';

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Render React on Server
app.get('/',function(req,res){
    var markup=React.renderComponentToString(App());
    res.send('<!DOCTYPE html>'+markup);
});

/* Middelware API - Start */

app.get('/list', function(req, res){
    console.log('listing page');
    http.get(wynk_api+feed_path, function(response) {
        var body;
        console.log("Got response: " + response.statusCode);
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(response.statusCode);
        response.on('data', function (data) {
            if(typeof body === 'undefined'){
                body = data;
            }
            else{
                body += data;
            }
        });
        response.on('end', function() {
            res.write(body);
            res.end();
        });

    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
});

app.get('/details/:id', function(req, res) {
    console.log('details page');
    http.get(wynk_api+detail_path+req.params.id, function(response) {
        var body;
        console.log("Got response: " + response.statusCode);
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(response.statusCode);
        response.on('data', function (data) {
            if(typeof body === 'undefined'){
                body = data;
            }
            else{
                body += data;
            }
        });
        response.on('end', function() {
            res.write(body);
            res.end();
        });

    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
});

app.get('/itemdetails/:id', function(req, res) {
    console.log(req.params.id);
});

app.get('/configuration', function(req, res) {
});
/* Middelware API - End */


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
