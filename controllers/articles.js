let express = require('express')
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
  // Can use async for the (req, res) => {} like this async (req, res)
  // db.article.findOne({
  //   where: { id: req.params.id },
  //   include: [db.author]
  // })
  // .then((article) => {
  //   if (!article) throw Error()
  //   console.log(article.author)
  //   const comments = db.comment.findAll( {where: {
  //     articleId : req.params.id
  //   }}).then( (comments)=> res.render('articles/show', {article, comments}))
  //   // res.render('articles/show', { article: article })
  // })
  // .catch((error) => {
  //   console.log(error)
  //   res.status(400).render('main/404')
  // })

  // db.comment.findAll().then((comments) => {(res.render({comments}))})

  // ABOVE WORKS BUT THIS IS USING async await
  async function tempAsyncFunction() {
  const article = await db.article.findOne({
    where: {id: req.params.id },
    include: [db.author, db.comment]
  })

  if (!article) throw Error()
  res.render('articles/show', { article: article})
  }

  tempAsyncFunction()


})



router.post('/:id', (req, res) => {
  // console.log(req.params.id)
  const commentContent = req.body.comment.content
  const commentName = req.body.comment.creator
  console.log(commentContent, "commentContent")
  console.log(commentName, "commentName")
  db.comment.create({content: commentContent, creator: commentName, articleId:req.params.id})
  .then((() => {  
    const article = db.article.findOne({
    where: { id: req.params.id },
    include: [db.author]
  })
  .then(res.render('articles/show', { article }))
  // shows on page when refreshed
}))
  // .catch((err) => {
  //   console.log(err)
  //   res.status(400).render('main/404')
  // })
})

// router.post('/articles/:id', (req, res) => {
//   const id = req.params.id
//   console.log(id)
//   res.send("hello I am here")
// })
module.exports = router


// When using POST PUT OR DELETE ROUTES you can res.redirect