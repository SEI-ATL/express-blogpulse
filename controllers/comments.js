let express = require('express')
let db = require('../models')
let router = express.Router()

router.post('/comments', (req, res) => {
    console.log('body', req.body)
    db.comment.create({
        user: req.body.user,
        content: req.body.content,
        articleId: req.body.articleId
    }).then((comment) => {
        res.redirect(`/articles/${comment.articleId}`)
    })
})

module.exports = router;