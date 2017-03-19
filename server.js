const express = require('express');
const mongoose = require('mongoose');
const dbURI = require('./config/database');
const routes = require('./app/routes/routes');
const port = process.env.PORT || 8080;
const app = express();

/* connect to database */
mongoose.connect(dbURI.url);

/* if connected then start server  */
mongoose.connection.on('connected', () => {
  app.use(express.static(__dirname + '/public'));
  require('./config/middleware')(app);
  app.use('/', routes);

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});

/* handle if mongoose errors or disconnects  */
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  console.log(`Mongoose default connection ${dbURI} disconnected`);
});

/*  disconnect from mongoose if application quits */
process.on('SIGINIT', () => {
  mongoose.connection.close(() => {
    console.log(`Mongoose default connection disconnected through app termination`);
    process.exit(0);
  });
});
