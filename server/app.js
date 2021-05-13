// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const apitasks = require('./routes/api/api.tasks');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://test:t3st1ng@cluster0.qoaxd.mongodb.net/list?retryWrites=true&w=majority`,
 {useNewUrlParser: true, useUnifiedTopology: true})
.catch((err)=>{
  console.error(`database connection error: ${err}`);
  process.exit();
});
// initialize express
const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// set up routes and routers
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/api/tasks', apitasks);

app.use('/', (req, res) => {
  // filter for actual files we want to deliver from disk
  var pattern = new RegExp('(.css|.html|.js|.ico|.jpg|.png)+\/?$', 'gi'); 
  if (pattern.test(req.url)) {
     // in cases where the Angular app is mounted at the root url, we may need to strip a trailing slash from the redirected request 
     let url = req.url.replace(/\/$/, "");
     // deliver the requested file
     res.sendFile(path.resolve(__dirname, `../client/dist/assignment7/${url}`));
  } else {
     // in this case, the request should be handled by Angular, which is index.html
     res.sendFile(path.resolve(__dirname, '../client/dist/assignment7/index.html'));
  }
});

// catch any remaining routing errors
app.use((req, res, next)=>{
  const err = new Error('Not Found' + req.url);
  err.status = 404;
  next(err);
});
module.exports = app;
