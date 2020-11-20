const express = require('express');
const router = express.Router();
const db = require('../models');

//POST COMMENTS -- OR DIE TRYING
router.post("/", (req, res) => {
    db.comment.create({
      name: req.body.name,
      comment: req.body.comment,
      articleId: req.body.postId
    })
    .then(() => {
      res.redirect(`/articles/${req.body.articleId}`)
    })
    .catch((err) => {
      console.log(err)
    })
  })
  
  module.exports = router;