const express = require('express');
// const bodyParser = require('body-parser');
const router = express.Router();
const blogPosts = require('./blog-posts');

// const jsonParser = bodyParser.json();
const app = express();

app.use('/blog-posts', blogPosts);

app.listen(process.env.PORT || 8080, () => {
  console.log('Listening...');
});