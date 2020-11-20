let express = require('express')
const { Op } = require('sequelize')
let db = require('../models')
let router = express.Router()

// POST /articles - create a new post
router.post('/', (req, res) => {
  db.article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then((post) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/new - display form for creating new articles
router.get('/new', (req, res) => {
  db.author.findAll()
  .then((authors) => {
    res.render('articles/new', { authors: authors })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/:id - display a specific post and its author
router.get('/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author]
  })
  .then((article) => {
    if (!article) throw Error()
    db.comment.findAll({
      where: {
        articleId: {
          [Op.eq]: article.id,
        }
      }
    })
    .then(comments => {
      res.render('articles/show', { article: article, comments: comments })
    })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

// POST /comment - will redirect back to article/:id
router.post('/:id/comment', (req, res) => {
  
  db.comment.create({
    username: req.body.username,
    comment: req.body.comment,
    articleId: req.params.id
  }).then(() =>{
    res.redirect(`/articles/${req.params.id}`)
  })
})

module.exports = router
