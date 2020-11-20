let express = require('express')
let db = require('../models')
let router = express.Router()
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

// POST /articles - create a new post
router.post('/', (req, res) => {
    db.article.create({
            title: req.body.title,
            content: md.render(req.body.content),
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
            include: [db.author, db.comment]
        })
        .then((article) => {
            if (!article) throw Error()
            db.author.findAll().then((foundAuthors) => {
                res.render('articles/show', { article: article, authors: foundAuthors })
            })

        })
        .catch((error) => {
            console.log(error)
            res.status(400).render('main/404')
        })
})

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

module.exports = router