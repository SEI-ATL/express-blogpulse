const router = require('express').Router()
const db = require('../models')


router.post('/', async (req, res) => {
    // console.log(req);
    // db.comment.create({
    //     content: req.body.content,
    //     name: req.body.name,
    //     articleId: req.body.articleId
    // })
    // .then((_comment) => {
    //     res.redirect(`/articles/${req.body.articleId}`)
    // })
    await db.comment.create({
            content: req.body.content,
            name: req.body.name,
            articleId: req.body.articleId
        })
    res.redirect(`/articles/${req.body.articleId}`)

});

module.exports = router