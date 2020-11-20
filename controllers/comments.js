const router = require('express').Router()
const db = require('../models')

router.post('/', (req, res) =>{
db.comment.create({
    content: req.body.params,
    name: req.body.name,
    articleId: req.body.articleId
}).then((comment)=>{
    res.redirect (`/articles/${req.body.articleId}`)
    })
})

module.exports = router