let router = reqire('express')
let db = require('./models')

router.post('/', (req, res) => {
    db.comment.create({
        name: req.body.name,
        content: req.body.content,
        articleNum: req.body.articleNum
    }).then(comment => {
        res.redirect(`/articles/${req.body.articleNum}`)
    }).catch((error) => {
        res.status(400).render('main/404')
      })
})