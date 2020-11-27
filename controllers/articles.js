const express = require('express')
const db = require('../models')
const router = express.Router()

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
router.post('/comment', (req,res)=>{
  db.comments.findOrCreate({
    where: {
      articleId: req.body.articleid,
      content: req.body.content
    }
  })
  res.redirect(`/articles/${req.body.articleid}`)
})

// GET /articles/:id - display a specific post and its author
router.get('/:id', async (req, res) => {
  try{
    let article = await db.article.findOne({
      where: { id: req.params.id },
      include: [db.author]
    })
    let comments = await db.comments.findAll({
      where: {
        articleId: req.params.id
      }
    })
    if (comments.length === 0) comments = []
    res.render('articles/show', { article,comments })

  }catch(error){
    console.log(error)
    res.status(400).render('main/404')
  }
})

module.exports = router
