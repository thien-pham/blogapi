const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const model = require('./models');

model.BlogPosts.create('title', 'content', 'author', 'publishDate');


router.get('/', (req,res)=>{
  res.send(model);
})

router.post('/', (req, res) => {
  let title =req.query.title;
  let content =req.query.content;
  let author =req.query.author;
  let date =req.query.date;
  model.BlogPosts.create(date, content, author, date);
  res.status(201).end();
});

router.put('/:id', (req, res) => {
  let title =req.query.title;
  let content =req.query.content;
  let author =req.query.author;
  let date =req.query.date;
  let id = req.params.id;
  model.BlogPosts.update({id, date, content, author, date});
  res.status(201).end();
});

router.delete('/', (req,res) =>{
  model.BlogPosts.delete(req.query.id);
  res.status(204).end();
});

module.exports = router;