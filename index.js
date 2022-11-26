const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
// const PORT = process.env.PORT || 5000;
const app = express();

const http = require('http');
const https = require('https');
const fs = require('fs');

const HTTP_PORT = 80;
const HTTPS_PORT = 443;

const options = {
  key: fs.readFileSync('./rootca.key'),
  cert: fs.readFileSync('./rootca.crt')
};



dotenv.config();
app.use(cookieParser());
app.use(morgan('dev')); // log
app.use(express.json()); // req body parsing
app.use(express.urlencoded({ extended: false })); // url query parsing
app.use(
  cors({
    origin: ['https://ttot.netlify.app', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
  }),
);

const router = require('./route.js');
app.use('/', router);

// app.listen(PORT, () => {
//   console.log(`개발환경 : ${process.env.NODE_ENV}`);
//   console.log(`server connect ${PORT}`);
// });

http.createServer(app).listen(HTTP_PORT);
https.createServer(options, app).listen(HTTPS_PORT);


module.exports = app;
