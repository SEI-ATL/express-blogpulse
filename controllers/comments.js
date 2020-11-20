const router = require('express').Router();
const db = require('../models');


router.post('/', (req, res) => {
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    articleId: req.body.articleId
  }).then(comment => {
    res.redirect(`/articles/${req.body.articleId}`);
  });
});

module.exports = router;