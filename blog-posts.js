const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const model = require('./models');

// model.create('title', 'content', 'author', 'publishDate');

router.get('/', (req, res) => {
  res.send(model.BlogPosts.posts[0].toString());
});

module.exports = router;