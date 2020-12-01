var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const Mongoclient = require('mongodb').MongoClient;
const assert  = require('assert');
const dbopper = require('./config/operation')
const url = 'mongodb://localhost:27017/'
const dbname = 'conFusion';

Mongoclient.connect(url,(err,client)=>{
  
  assert.equal(err,null);

  console.log('connected to the server');

  const db = client.db(dbname);

  dbopper.insertDocument(db,{name:"tuwo",description:"hello"},'dishes',(result)=>{
    console.log('insert Document:\n', result.ops);

    dbopper.findDocuments(db,'dishes',(docs)=>{
      console.log('Found document:\n',docs);

      dbopper.updateDocument(db,{name:"tuwo"},{description:"you wanna sleep no"},'dishes',(result)=>{
        console.log('updated Document', result.result);

        dbopper.findDocuments(db,'dishes',(docs)=>{
          console.log('Found document:\n',docs); 
          db.dropCollection('dishes',(result)=>{
            console.log('drop collection', result);

            client.close();
          })
        });
      });
    });
  });
  // const collection = db.collection('dishes');

  // collection.insertOne({"name":'tuwo',"description":"miyan taushe"},(err,result)=>{
  //   assert.equal(err,null)

  //   console.log('after insert');
  //   console.log(result.ops);

  //   collection.find({}).toArray((err,docs)=>{

  //     assert.equal(err,null)
  //     console.log('Found:\n');
  //     console.log(docs);

  //     db.dropCollection('dishes',(err, result)=>{
  //       assert.equal(err,null)

  //       client.close();

  //     });

  //   })
  // })
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
