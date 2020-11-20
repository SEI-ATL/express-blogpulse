const router = require('express').Router()
const db = require('../models')

router.post('/', (req, res) => {
    db.comment.create({
        content: req.body.content,
        creator: req.body.creator,
        articleId: req.body.articleId
    }).then((comment) => {
        res.redirect(`/articles/${req.body.articleId}`)
    })

//    async function temp() {
//         await db.comment.create(req.body)
//         res.redirect(`/articles/${req.body.articleId}`)
//     }
//     temp()
})






module.exports = router