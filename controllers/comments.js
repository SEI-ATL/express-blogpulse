let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /comments - create a new comment
router.post('/articles/:id/comments', (req, res) => {
    db.comment.create({
        name: req.body.name,
        content: req.body.content,
        articleId: req.body.articleId
    })
    .then((post) => {
        res.redirect('/articles')
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})
  
// GET /comments/new - display form for creating new comments
// router.get('/new', (req, res) => {
//     db.comment.findAll()
//     .then((articles) => {
//         res.render('comments/new', { articles: articles })
//     })
//     .catch((error) => {
//         res.status(400).render('main/404')
//     })
// })  

module.exports = router